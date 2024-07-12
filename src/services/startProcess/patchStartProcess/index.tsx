import { enviroment } from "@src/config/environment";
import { IStartProcessesRequest, IStartProcessResponse } from "@pages/startProcess/types";
import { mapStartProcessEntityToApi } from "./mappers";

const startProcess = async (process: IStartProcessesRequest): Promise<
  IStartProcessResponse | undefined
> => {
  const requestUrl = `${enviroment.ICLIENT_API_URL_QUERY_PERSISTENCE}/process-controls`;
  try {
    const options: RequestInit = {
      method: "PATCH",
      headers: {
        "X-Action": "IprocessStartAProcess",
        "X-Business-Unit": enviroment.TEMP_BUSINESS_UNIT,
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
        message: "Error al descartar publicación",
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
