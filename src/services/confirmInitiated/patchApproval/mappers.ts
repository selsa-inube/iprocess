import { IApprovalRequest } from "@pages/confirmInitiated/components/Requeriments/Approval/types";

const mapApprovalRequirementEntityToApi = (
  data: IApprovalRequest
): Record<string, string | number | object> => {
  return {
    packageId: data.packageId,
    modifyJustification: data.modifyJustification,
    requirementModifyDate: data.requirementModifyDate,
    requirementPackageId: data.requirementPackageId,
  };
};
export { mapApprovalRequirementEntityToApi };
