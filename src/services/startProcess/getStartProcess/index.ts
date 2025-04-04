import {
  enviroment,
  fetchTimeoutServices,
  maxRetriesServices,
} from "@config/environment";
import {
  FilterProcessesForDate,
  StartProcessesFilter,
} from "@pages/startProcess/types";
import { mapStartProcessApiToEntities } from "./mappers";

const startProcessData = async (
  businessUnitPublicCode: string,
  FilterProcesses: FilterProcessesForDate
): Promise<StartProcessesFilter> => {
  const maxRetries = maxRetriesServices;
  const fetchTimeout = fetchTimeoutServices;
  const emptyResponse = {
    onDemand: [],
    scheduled: [],
  };

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const queryParams = new URLSearchParams({
        year: FilterProcesses.year,
        month: FilterProcesses.month,
      });

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), fetchTimeout);

      const options: RequestInit = {
        method: "GET",
        headers: {
          "X-Action": "IProcessStartProcesses",
          "X-Business-Unit": businessUnitPublicCode,
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
        return emptyResponse;
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
        ? mapStartProcessApiToEntities(data)
        : emptyResponse;

      return normalizedStartProcess;
    } catch (error) {
      if (attempt === maxRetries) {
        throw new Error(
          "Todos los intentos fallaron. No se pudieron obtener los procesos."
        );
      }
    }
  }

  return emptyResponse;
};

export { startProcessData };
