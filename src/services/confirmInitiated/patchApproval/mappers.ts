import { IApprovalRequest } from "@pages/confirmInitiated/components/Requeriments/Approval/types";

const mapApprovalRequirementEntityToApi = (
  data: IApprovalRequest
): Record<string, string | number | object> => {
  return {
    id: String(data.id),
    justification: String(data.justification),
    date: String(data.date),
    description: String(data.description),
    uniqueReferenceNumber: String(data.uniqueReferenceNumber),
    listOfRequirementsByPackage: Object(data.listOfRequirementsByPackage),
    traceabilityInRequirements: Object(data.traceabilityInRequirements),
};
}
export { mapApprovalRequirementEntityToApi };
