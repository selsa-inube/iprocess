import { enviroment } from "@config/environment";
import { IDiscardPersonsWithErrorsRequest, IDiscardPersonsWithErrorsResponse } from "@pages/validateProgress/types";
import { mapDiscardPersonsWithErrorEntityToApi } from "./mappers";

const discardPersonsWithErrors = async ( businessUnitPublicCode: string, process: IDiscardPersonsWithErrorsRequest): Promise<
IDiscardPersonsWithErrorsResponse | undefined
> => {
  const requestUrl = `${enviroment.IPROCESS_API_URL_PERSISTENCE}/process-controls`;
  try {
    const options: RequestInit = {
      method: "PATCH",
      headers: {
        "X-Action": "IprocessDiscardPeopleWhoPresentedError",
        "X-Business-Unit": businessUnitPublicCode,
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(mapDiscardPersonsWithErrorEntityToApi(process)),
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

export { discardPersonsWithErrors };
