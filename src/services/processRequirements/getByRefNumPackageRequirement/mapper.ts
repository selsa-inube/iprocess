import { IRefNumPackageRequirement } from "@ptypes/packageRequeriment.types";

const mapRefNumPackRequirementApiToEntity = (
  requirement: Record<string, string | number | object>
): IRefNumPackageRequirement => {
  const packageRequirement: IRefNumPackageRequirement = {
    id: String(requirement.packageId),
    generalStatusRequirement: String(requirement.generalStatusPackageRequirement),
    date: new Date(String(requirement.packageDate)),
    description: String(requirement.packageDescription),
    uniqueReferenceNumber: String(requirement.uniqueReferenceNumber),
    listOfRequirements: Object(requirement.listOfRequirements),
  };
  return packageRequirement;
};



export {
  mapRefNumPackRequirementApiToEntity,
};
