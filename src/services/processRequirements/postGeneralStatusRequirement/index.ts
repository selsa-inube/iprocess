import { enviroment } from "@config/environment";
import {
  IGeneralStatusRequirementRequest,
  IGeneralStatusRequirementResponse,
} from "@ptypes/statusRequeriments.types";

import { mapGeneralStatusRequirementEntityToApi } from "./mappers";

const generalStatusRequirement = async (
  businessUnitPublicCode: string,
  processData: IGeneralStatusRequirementRequest
): Promise<IGeneralStatusRequirementResponse | undefined> => {
  const requestUrl = `${enviroment.IPROCESS_API_URL_PERSISTENCE}/process-controls`;
  try {
    const options: RequestInit = {
      method: "POST",
      headers: {
        "X-Action": "DeduceGeneralStatusProcessRequirements",
        "X-Business-Unit": businessUnitPublicCode,
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(mapGeneralStatusRequirementEntityToApi(processData)),
    };

    const res = await fetch(requestUrl, options);

    const data = await res.json();

    if (res.status === 204) {
      return;
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
    console.info(error);
    throw error;
  }
};

export { generalStatusRequirement };
