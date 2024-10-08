import {
  enviroment,
  fetchTimeoutServices,
  maxRetriesServices,
} from "@config/environment";
import { IListPeriods } from "@pages/startProcess/types";
import { mapListPeriodToProcessInitiatedApiToEntities } from "./mappers";


const listPeriodsToProcessInitiated = async (
  cutOffDate: string
): Promise<IListPeriods[]> => {
  const maxRetries = maxRetriesServices;
  const fetchTimeout = fetchTimeoutServices;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const queryParams = new URLSearchParams({
        cutOffDate,
      });

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), fetchTimeout);

      const options: RequestInit = {
        method: "GET",
        headers: {
          "X-Action": "PeriodToProcessInitiated",
          "X-Business-Unit": enviroment.TEMP_BUSINESS_UNIT,
          "Content-type": "application/json; charset=UTF-8",
        },
        signal: controller.signal,
      };

      const res = await fetch(
        `${enviroment.IPROCESS_API_URL_QUERY}/process-controls?${queryParams.toString()}`,
        options
      );

      clearTimeout(timeoutId);

      if (res.status === 204) {
        return [];
      }

      const data = await res.json();

      if (!res.ok) {
        throw {
          message: "Error al obtener los periodos de iniciar procesos",
          status: res.status,
          data,
        };
      }

      const normalizedListPeriodToProcessInitiated = Array.isArray(data)
        ? mapListPeriodToProcessInitiatedApiToEntities(data)
        : [];

      return normalizedListPeriodToProcessInitiated;
    } catch (error) {
      if (attempt === maxRetries) {
        throw new Error(
          "Todos los intentos fallaron. No se pudieron obtener la lsita de los periodos de iniciar procesos."
        );
      }
    }
  }

  return [];
};

export { listPeriodsToProcessInitiated };
