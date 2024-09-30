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

interface ItraceabilityInRequirements {
  assignedStatus: string;
  justificationForChangeOfStatus: string;
  traceabilityDate: string;
  packageId?: string;
  requirementPackageId?: string;
  traceabilityId?: string;
  transactionOperation?: string;
}

interface IApprovalRequest {
  id: string;
  date: string;
  description: string;
  uniqueReferenceNumber: string;
  justification?: string;
  listOfRequirementsByPackage?: IListOfRequirementsByPackage[];
  traceabilityInRequirements?: ItraceabilityInRequirements[];
}

interface IApprovalResponse {
  modifyJustification: string;
  packageDate: string;
  packageDescription: string;
  packageId: string;
  uniqueReferenceNumber: string;
  listOfRequirementsByPackage?: IListOfRequirementsByPackage[];
  traceabilityInRequirementsManagement?: ItraceabilityInRequirements[];
}

export type { IListOfRequirementsByPackage,IApprovalRequest, IApprovalResponse };
