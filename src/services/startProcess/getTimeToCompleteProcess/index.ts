import {
  enviroment,
  fetchTimeoutServices,
  maxRetriesServices,
} from "@config/environment";
import { ITimeEstimedCompleteProcess } from "@pages/startProcess/types";
import { mapTimeToCompleteProcessApiToEntity } from "./mappers";

const timeToCompleteProcess = async (
  processControlId: string
): Promise<ITimeEstimedCompleteProcess> => {
  const maxRetries = maxRetriesServices;
  const fetchTimeout = fetchTimeoutServices;

  const emptyResponse = {
    totalPersons: 0,
    totalProcessedPersons: 0,
    duration: "",
  };

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), fetchTimeout);

      const options: RequestInit = {
        method: "GET",
        headers: {
          "X-Action": "CalculateEstimatedTimeToCompleteProcess",
          "X-Business-Unit": enviroment.TEMP_BUSINESS_UNIT,
          "Content-type": "application/json; charset=UTF-8",
        },
        signal: controller.signal,
      };

      const res = await fetch(
        `${enviroment.IPROCESS_API_URL_QUERY}/process-controls/process-control-executions/${processControlId}`,
        options
      );

      clearTimeout(timeoutId);

      if (res.status === 204) {
        return emptyResponse;
      }

      const data = await res.json();

      if (!res.ok) {
        throw {
          message: `Error al obtener el tiempo estimado al iniciar el proceso ${processControlId}`,
          status: res.status,
          data,
        };
      }

      const normalizedTimeToCompleteProcess = mapTimeToCompleteProcessApiToEntity(data);

      return normalizedTimeToCompleteProcess;
    } catch (error) {
      if (attempt === maxRetries) {
        throw new Error(
          "Todos los intentos fallaron. No fue posible obtener el tiempo estimado."
        );
      }
    }
  }

  return emptyResponse;
};

export { timeToCompleteProcess };
