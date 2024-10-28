import { enviroment, fetchTimeoutServices, maxRetriesServices } from "@config/environment";
import { IPersonProcessTime } from "@pages/validateProgress/types";
import { mapEstimatedTimeToProcessApiToEntity } from "./mappers";

const personProcess = async (
    processControlId: string
): Promise<IPersonProcessTime> => {
  const maxRetries = maxRetriesServices;
  const fetchTimeout = fetchTimeoutServices;

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
        return {} as IPersonProcessTime;
      }

      const data = await res.json();
      
      if (!res.ok) {
        throw {
          message: "Error al obtener eltiempo estimado para completar el proceso",
          status: res.status,
          data,
        };
      }

      return mapEstimatedTimeToProcessApiToEntity(data);
    } catch (error) {
      if (attempt === maxRetries) {
        throw new Error(
          "Todos los intentos fallaron. No se pudieron obtener eltiempo estimado para completar el proceso"
        );
      }
    }
  }

  return {} as IPersonProcessTime;
};

export { personProcess };
