import { enviroment } from "@config/environment";
import {
  IProcessRequirementRequest,
  IProcessRequirementResponse,
} from "@ptypes/statusRequeriments.types";

import { mapprocessRequirementEntityToApi } from "./mappers";

const processRequirement = async (
  businessUnitPublicCode: string,
  processData: IProcessRequirementRequest
): Promise<IProcessRequirementResponse[] | undefined> => {
  const requestUrl = `${enviroment.IPROCESS_API_URL_PERSISTENCE}/process-controls`;
  try {
    const options: RequestInit = {
      method: "POST",
      headers: {
        "X-Action": "IprocessDeduceProcessRequirement",
        "X-Business-Unit": businessUnitPublicCode,
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(mapprocessRequirementEntityToApi(processData)),
    };

    const res = await fetch(requestUrl, options);

    if (res.status === 204) {
      return [];
    }
    const data = await res.json();

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
