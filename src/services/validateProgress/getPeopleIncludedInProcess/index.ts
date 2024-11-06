import { enviroment, maxRetriesServices } from "@config/environment";
import { IProcessPersons } from "@pages/validateProgress/types";
import { mapPeopleIncludedInProcessToEntities } from "./mappers";

const peopleIncludedInProcess = async (
  businessUnitPublicCode: string,
  processControlId: string,
  page: string,
  personProcessedWithErrors: string
): Promise<IProcessPersons[]> => {
  const maxRetries = maxRetriesServices;
  const fetchTimeout = 60000;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const queryParams = new URLSearchParams({
        page: page,
        per_page: "60",
        executionStatusByPerson: personProcessedWithErrors
      });
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), fetchTimeout);

      const options: RequestInit = {
        method: "GET",
        headers: {
          "X-Action": "SearchThePeopleIncludedInAProcess",
          "X-Business-Unit": businessUnitPublicCode,
          "Content-type": "application/json; charset=UTF-8",
        },
        signal: controller.signal,
      };

      const res = await fetch(
        `${enviroment.IPROCESS_API_URL_QUERY}/process-controls/${processControlId}?${queryParams.toString()}`,
        options
      );

      clearTimeout(timeoutId);

      if (res.status === 204) {
        return [];
      }

      const data = await res.json();

      if (!res.ok) {
        throw {
          message: "Error al obtener las personas incluidas en el proceso",
          status: res.status,
          data,
        };
      }

      return mapPeopleIncludedInProcessToEntities(data);
    } catch (error) {
      if (attempt === maxRetries) {
        throw new Error(
          "Todos los intentos fallaron. No se pudieron obtener las personas incluidas en el proceso."
        );
      }
    }
  }

  return [];
};

export { peopleIncludedInProcess };
