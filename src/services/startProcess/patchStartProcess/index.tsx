import { enviroment } from "@config/environment";
import {
  IStartProcessesRequest,
  IStartProcessResponse,
} from "@pages/startProcess/types";
import { mapStartProcessEntityToApi } from "./mappers";

const startProcess = async (
  businessUnitPublicCode: string,
  process: IStartProcessesRequest
): Promise<IStartProcessResponse | undefined> => {
  const requestUrl = `${enviroment.IPROCESS_API_URL_PERSISTENCE}/process-controls`;
  try {
    const options: RequestInit = {
      method: "PATCH",
      headers: {
        "X-Action": "IprocessStartAProcess",
        "X-Business-Unit": businessUnitPublicCode,
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(mapStartProcessEntityToApi(process)),
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

export { startProcess };
