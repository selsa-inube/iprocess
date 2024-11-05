import { enviroment } from "@config/environment";
import {
  IConfirmProcessRequest,
  IConfirmProcessResponse,
} from "@pages/confirmInitiated/types";
import { mapConfirmProcessEntityToApi } from "./mappers";

const confirmIndividualProcess = async (
  businessUnitPublicCode: string,
  process: IConfirmProcessRequest
): Promise<IConfirmProcessResponse | undefined> => {
  const requestUrl = `${enviroment.IPROCESS_API_URL_PERSISTENCE}/process-controls`;
  try {
    const options: RequestInit = {
      method: "PATCH",
      headers: {
        "X-Action": "ConfirmIndividualExecutionProcess",
        "X-Business-Unit": businessUnitPublicCode,
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(mapConfirmProcessEntityToApi(process)),
    };

    const res = await fetch(requestUrl, options);

    const data = await res.json();

    if (res.status === 204) {
      return;
    }

    if (!res.ok) {
      throw {
        message: "Error al confirmar el proceso",
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

export { confirmIndividualProcess };
