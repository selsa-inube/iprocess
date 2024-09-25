import { IRefNumPackageRequirement } from "@src/types/packageRequeriment.types";

const mapRefNumPackRequirementApiToEntity = (
  requirement: Record<string, string | number | object>
): IRefNumPackageRequirement => {
  const packageRequirement: IRefNumPackageRequirement = {
    id: String(requirement.packageId),
    generalStatusRequirement: String(requirement.generalStatusPackageRequirement),
    listOfRequirements: Object(requirement.listOfRequirements),
    date: new Date(String(requirement.packageDate)),
    description: String(requirement.packageDescription),
    uniqueReferenceNumber: String(requirement.uniqueReferenceNumber),
  };
  return packageRequirement;
};

const mapListPeriodStartProcessApiToEntities = (
  periods: Record<string, string | number | object>[]
): IRefNumPackageRequirement[] => {
  return periods.map((period) => mapRefNumPackRequirementApiToEntity(period));
};

export {
  mapRefNumPackRequirementApiToEntity,
  mapListPeriodStartProcessApiToEntities,
};
