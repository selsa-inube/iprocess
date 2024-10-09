import { enviroment } from "@config/environment";
import { IRemoveProcessRequest, IRemoveProcessResponse } from "@pages/confirmInitiated/components/Delete/types";
import { mapDeleteConfirmInitiatedToApi } from "./mappers";

  
  const removeProcessConfirmInitiated = async (
    process: IRemoveProcessRequest,
  ): Promise< IRemoveProcessResponse | undefined> => {
  
    const requestUrl = `${enviroment.IPROCESS_API_URL_PERSISTENCE}/process-controls`;
  
    try {
      const options: RequestInit = {
        method: "DELETE",
        headers: {
          "X-Action": "RemoveProcessControlCatalog",
          "X-Business-Unit": enviroment.TEMP_BUSINESS_UNIT,
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(mapDeleteConfirmInitiatedToApi(process)),
      };
  
      const res = await fetch(requestUrl, options);
      
      const data = await res.json();
  
      if (res.status === 204) {
        return;
      }
  
      if (!res.ok) {
        throw {
          message: "Error al eliminar el proceso",
          status: res.status,
          data,
        };
      }
  
      return data;
    } catch (error) {
      console.info(error);
      throw error;
    }
  };
  
  export { removeProcessConfirmInitiated };
  