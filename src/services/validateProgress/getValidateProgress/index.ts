import { enviroment } from "@src/config/environment";
import {
    FilterProgressForDate,
    ValidateProgresses,
} from "@pages/validateProgress/types";
import {
    mapValidateProgressesApiToEntities,
} from "./mappers";

const validateProgressData = async (FilterProgresses: FilterProgressForDate) 
: Promise<ValidateProgresses[]> => {
  const maxRetries = 5;
  const fetchTimeout = 3000;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
        
      const queryParams = new URLSearchParams({
        Year: FilterProgresses.year,
        Month:FilterProgresses.month,
        ExecutionDateToTime:FilterProgresses.executionDate
      })

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), fetchTimeout);

      const options: RequestInit = {
        method: "GET",
        headers: {
          "X-Action": "SearchAllProcessControl",
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

      const normalizedValidateProgress = Array.isArray(data)
        ? mapValidateProgressesApiToEntities(data)
        : [];

      return normalizedValidateProgress;
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

export { validateProgressData };
