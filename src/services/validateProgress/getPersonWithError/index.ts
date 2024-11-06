import {
    enviroment,
    fetchTimeoutServices,
    maxRetriesServices,
  } from "@config/environment";
  import { IPersonWithError } from "@pages/validateProgress/types";
  import { mapPersonWithErrorToEntities } from "./mappers";
  
  const personWithError = async (
    businessUnitPublicCode: string,
    processControlId: string,
    processPersonId: string
  ): Promise<IPersonWithError[]> => {
    const maxRetries = maxRetriesServices;
    const fetchTimeout = fetchTimeoutServices;
  
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), fetchTimeout);
  
        const options: RequestInit = {
          method: "GET",
          headers: {
            "X-Action": "SearchByIdCheckErrorStatus",
            "X-Business-Unit": businessUnitPublicCode,
            "Content-type": "application/json; charset=UTF-8",
          },
          signal: controller.signal,
        };
  
        const res = await fetch(
          `${enviroment.IPROCESS_API_URL_QUERY}/process-controls/${processControlId}/${processPersonId}`,
          options
        );
  
        clearTimeout(timeoutId);
  
        if (res.status === 204) {
          return [];
        }
  
        const data = await res.json();
  
        if (!res.ok) {
          throw {
            message: "Error al obtener el error que tiene la persona",
            status: res.status,
            data,
          };
        }
  
     
        return mapPersonWithErrorToEntities(data);
      } catch (error) {
        if (attempt === maxRetries) {
          throw new Error(
            "Todos los intentos fallaron. No fue posible obtener el error que tiene la persona."
          );
        }
      }
    }
  
    return [];
  };
  
  export { personWithError };
  