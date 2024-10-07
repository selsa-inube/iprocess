import { enviroment } from "@config/environment";
import {
  IApprovalRequest,
  IApprovalResponse,
} from "@pages/confirmInitiated/components/Requeriments/Approval/types";
import { mapApprovalRequirementEntityToApi } from "./mappers";

const approvalRequirement = async (
  dataApproval: IApprovalRequest
): Promise<IApprovalResponse | undefined> => {
  const requestUrl = `${enviroment.IREQUER_API_URL_PERSISTENCE}/package-requirements-management`;
  try {
    const options: RequestInit = {
      method: "PATCH",
      headers: {
        "X-Action": "ModifyPackageRequirementManagement",
        "X-Business-Unit": enviroment.TEMP_BUSINESS_UNIT,
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(mapApprovalRequirementEntityToApi(dataApproval)),
    };

    const res = await fetch(requestUrl, options);

    const data = await res.json();

    if (res.status === 204) {
      return;
    }

    if (!res.ok) {
      throw {
        message: "Error al aprobar el requerimiento",
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

export { approvalRequirement };
