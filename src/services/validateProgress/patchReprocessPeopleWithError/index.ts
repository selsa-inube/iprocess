import { enviroment } from "@config/environment";
import { IReprocessPersonsWithErrorsRequest, IReprocessPersonsWithErrorsResponse } from "@pages/validateProgress/types";
import { mapReprocessPersonsWithErrorEntityToApi } from "./mappers";


const reprocessPersonsWithErrors = async ( businessUnitPublicCode: string, process: IReprocessPersonsWithErrorsRequest): Promise<
IReprocessPersonsWithErrorsResponse | undefined
> => {
  const requestUrl = `${enviroment.IPROCESS_API_URL_PERSISTENCE}/process-controls`;
  try {
    const options: RequestInit = {
      method: "PATCH",
      headers: {
        "X-Action": "ReprocessPeopleWithError",
        "X-Business-Unit": businessUnitPublicCode,
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(mapReprocessPersonsWithErrorEntityToApi(process)),
    };

    const res = await fetch(requestUrl, options);

    const data = await res.json();

    if (res.status === 204) {
      return;
    }

    if (!res.ok) {
      throw {
        message: "Error al iniciar proceso",
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

export { reprocessPersonsWithErrors };
