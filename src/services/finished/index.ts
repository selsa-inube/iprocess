import { enviroment, fetchTimeoutServices, maxRetriesServices } from "@config/environment";
import { StartProcesses } from "@pages/startProcess/types";
import { IFilterDateForMonthAndYear } from "@pages/validateProgress/types";

import { mapFinishedApiToEntities } from "./mappers";

const finishedData = async (date: IFilterDateForMonthAndYear): Promise<StartProcesses[]> => {
  const maxRetries = maxRetriesServices;
  const fetchTimeout = fetchTimeoutServices;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const queryParams = new URLSearchParams({
        processStatus: "Finished", 
        page: "1",
        per_page: "2000",
        executionDate:`bt.${date.startDate};${date.endDate}`,
      });

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), fetchTimeout);

      const options: RequestInit = {
        method: "GET",
        headers: {
          "X-Action": "SearchAllProcessControlCatalogs",
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
          message: "Error al obtener los procesos",
          status: res.status,
          data,
        };
      }

      const normalizedStartProcess = Array.isArray(data)
        ? mapFinishedApiToEntities(data)
        : [];

      return normalizedStartProcess;
    } catch (error) {
      if (attempt === maxRetries) {
        throw new Error(
          "Todos los intentos fallaron. No se pudieron obtener los procesos de la opción finalizados."
        );
      }
    }
  }

  return [];
};

export { finishedData };
