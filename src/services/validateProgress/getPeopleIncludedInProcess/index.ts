import { enviroment, maxRetriesServices } from "@config/environment";
import { IpeopleIncludedInTheProcess } from "@pages/validateProgress/types";
import { mapPeopleIncludedInProcessApiToEntity } from "./mappers";


const peopleIncludedInProcess = async (
    processControlId: string
): Promise<IpeopleIncludedInTheProcess> => {
  const maxRetries = maxRetriesServices;
  const fetchTimeout = 60000;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
         const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), fetchTimeout);

      const options: RequestInit = {
        method: "GET",
        headers: {
          "X-Action": "SearchByIdProcessControl",
          "X-Business-Unit": enviroment.TEMP_BUSINESS_UNIT,
          "Content-type": "application/json; charset=UTF-8",
        },
        signal: controller.signal,
      };

      const res = await fetch(
        `${enviroment.IPROCESS_API_URL_QUERY}/process-controls/${processControlId}`,
        options
      );

      clearTimeout(timeoutId);

      if (res.status === 204) {
        return {} as IpeopleIncludedInTheProcess;
      }

      const data = await res.json();
      
      if (!res.ok) {
        throw {
          message: "Error al obtener las personas incluidas en el proceso",
          status: res.status,
          data,
        };
      }

      return mapPeopleIncludedInProcessApiToEntity(data);
    } catch (error) {
      if (attempt === maxRetries) {
        throw new Error(
          "Todos los intentos fallaron. No se pudieron obtener las personas incluidas en el proceso."
        );
      }
    }
  }

  return {} as IpeopleIncludedInTheProcess;
};

export { peopleIncludedInProcess };
