interface IlistOfRequirements {
  descriptionEvaluationRequirement: string;
  descriptionUse: string;
  descriptionUseForCustomer: string;
  id: string;
  requirementDate: string;
  requirementId: string;
  requirementPackageId: string;
  requirementStatus: string;
  typeOfRequirementToEvaluated: string;
}

interface ItraceabilityInRequirements {
  assignedStatus: string;
  justificationForChangeOfStatus: string;
  id: string;
  requirementPackageId: string;
  traceabilityDate: string;
  traceabilityId: string;
}

interface IRefNumPackageRequirement {
  date: Date;
  description: string;
  id: string;
  uniqueReferenceNumber: string;
  generalStatusRequirement?: string;
  listOfRequirements?: IlistOfRequirements[];
  traceabilityInRequirements?: ItraceabilityInRequirements[];
}

export type { IRefNumPackageRequirement, IlistOfRequirements };
