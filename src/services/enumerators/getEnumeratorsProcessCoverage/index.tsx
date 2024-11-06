import { enviroment, fetchTimeoutServices, maxRetriesServices } from "@config/environment";
import { IEnumeratorsProcessCoverage } from "@forms/types";
import { mapEnumProcessCoverageApiToEntities } from "./mappers";


const EnumProcessCoverageData = async (businessUnitPublicCode: string): Promise<
  IEnumeratorsProcessCoverage[]
> => {
  const maxRetries = maxRetriesServices;
  const fetchTimeout = fetchTimeoutServices;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), fetchTimeout);

      const options: RequestInit = {
        method: "GET",
        headers: {
          "X-Action": "GetEnum",
          "X-Business-Unit": businessUnitPublicCode,
          "Content-type": "application/json; charset=UTF-8",
        },
        signal: controller.signal,
      };

      const res = await fetch(
        `${enviroment.IPROCESS_API_URL_QUERY_ENUM}/enumerators/processcoverage`,
        options
      );

      clearTimeout(timeoutId);

      if (res.status === 204) {
        return [];
      }

      const data = await res.json();

      if (!res.ok) {
        throw {
          message: "Error al obtener los procesos",
          status: res.status,
          data,
        };
      }

      const normalizedStartProcess = Array.isArray(data)
        ? mapEnumProcessCoverageApiToEntities(data)
        : [];

      return normalizedStartProcess;
    } catch (error) {
      if (attempt === maxRetries) {
        throw new Error(
          "Todos los intentos fallaron. No se pudieron obtener los procesos."
        );
      }
    }
  }

  return [];
};

export { EnumProcessCoverageData };
