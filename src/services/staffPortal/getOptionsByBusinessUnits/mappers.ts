import { IOptionsByBusinessUnits } from "@ptypes/staffPortalBusiness.types";

const mapOptionsByBusinessUnitsApiToEntity = (
  businessUnit: Record<string, string | number | object>
): IOptionsByBusinessUnits => {
  const businessUnitData: IOptionsByBusinessUnits = {
    optionStaffId: String(businessUnit.optionStaffId),
    abbreviatedName: String(businessUnit.abbreviatedName),
    descriptionUse: String(businessUnit.descriptionUse),
    publicCode: String(businessUnit.publicCode),
    useCaseId: String(businessUnit.useCaseId),
  };
  return businessUnitData;
};

const mapOptionsByBusinessUnitsToEntities = (
  resend: Record<string, string | number | object>[]
): IOptionsByBusinessUnits[] => {
  return resend.map(mapOptionsByBusinessUnitsApiToEntity);
};
export {
  mapOptionsByBusinessUnitsToEntities,
  mapOptionsByBusinessUnitsApiToEntity,
};
