import { enviroment } from "@src/config/environment";
import {
  FilterProcessesForDate,
  StartProcesses,
} from "@pages/startProcess/types";
import {
  mapStartProcessApiToEntities,
} from "./mappers";

const startProcessData = async (FilterProcesses: FilterProcessesForDate) 
: Promise<StartProcesses[]> => {
  const maxRetries = 5;
  const fetchTimeout = 3000;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
        
      const queryParams = new URLSearchParams({
        Year: FilterProcesses.year,
        Month:FilterProcesses.month,
        ExecutionDate:""
      })

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), fetchTimeout);

      const options: RequestInit = {
        method: "GET",
        headers: {
          "X-Action": "IProcessStartProcesses",
          "X-Business-Unit": enviroment.TEMP_BUSINESS_UNIT,
          "Content-type": "application/json; charset=UTF-8",
        },
        signal: controller.signal,
      };

      const res = await fetch(
        `${enviroment.ICLIENT_API_URL_QUERY}/process-controls?${queryParams.toString()}`,
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
        ? mapStartProcessApiToEntities(data)
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

export { startProcessData };
