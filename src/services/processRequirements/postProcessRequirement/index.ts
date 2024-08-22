import { enviroment } from "@src/config/environment";
import { IProcessRequirementRequest, IProcessRequirementResponse } from "@src/types/statusRequeriments.types";

import { mapprocessRequirementEntityToApi } from "./mappers";

const processRequirement = async (processData: IProcessRequirementRequest): Promise<
IProcessRequirementResponse[] | undefined
> => {
  const requestUrl = `${enviroment.IPROCESS_API_URL_PERSISTENCE}/process-controls`;
  try {
    const options: RequestInit = {
      method: "POST",
      headers: {
        "X-Action": "IprocessDeduceProcessRequirement",
        "X-Business-Unit": enviroment.TEMP_BUSINESS_UNIT,
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(mapprocessRequirementEntityToApi(processData)),
    };

    const res = await fetch(requestUrl, options);

    const data = await res.json();

    if (res.status === 204) {
      return[];
    }

    if (!res.ok) {
      throw {
        message: "Error al procesar el requisito",
        status: res.status,
        data,
      };
    }

    return data;

  } catch (error) {
    error;
    throw error;
  }
};

export { processRequirement };
