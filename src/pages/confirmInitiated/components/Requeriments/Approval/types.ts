interface IListOfRequirementsByPackage {
  packageId: string;
  requirementId: string;
  requirementPackageId: string;
  descriptionEvaluationRequirement: string;
  descriptionUseForCustomer: string;
  requirementDate: string;
  requirementStatus: string;
  typeOfRequirementToEvaluated: string;
  descriptionUse?: string;
  transactionOperation?: string;
}

interface IApprovalRequest {
  packageId: string;
  modifyJustification: string;
  requirementModifyDate: string;
  requirementPackageId: string;
}

interface IApprovalResponse {
  packageId: string;
  requirementPackageId: string;
  requirementStatus: string;
}

export type {
  IListOfRequirementsByPackage,
  IApprovalRequest,
  IApprovalResponse,
};
