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
  traceabilityId: string;
  assignedStatus: string;
  justificationForChangeOfStatus: string;
  traceabilityDate: string;
  requirementPackageId?: string;
  packageId?: string;
  transactionOperation?: string;
}

interface IApprovalRequest {
  id: string;
  justification: string;
  date: string;
  description: string;
  uniqueReferenceNumber: string;
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
