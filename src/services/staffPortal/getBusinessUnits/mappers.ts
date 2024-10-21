import { IBusinessUnitsPortalStaff } from "@ptypes/staffPortalBusiness.types";

const mapBusinessUnitsPortalStaffApiToEntity = (
  businessUnit: Record<string, string | number | object>
): IBusinessUnitsPortalStaff => {
  const businessUnitData: IBusinessUnitsPortalStaff = {
    publicCode: String(businessUnit.businessUnitPublicCode),
    languageId: String(businessUnit.languageId),
    abbreviatedName: String(businessUnit.abbreviatedName),
    descriptionUse: String(businessUnit.descriptionUse),
    firstMonthOfFiscalYear: String(businessUnit.firstMonthOfFiscalYear),
    urlLogo: String(businessUnit.urlLogo),
  };
  return businessUnitData;
};

const mapBusinessUnitsPortalStaffToEntities = (
  resend: Record<string, string | number | object>[]
): IBusinessUnitsPortalStaff[] => {
  return resend.map(mapBusinessUnitsPortalStaffApiToEntity);
};
export {
  mapBusinessUnitsPortalStaffToEntities,
  mapBusinessUnitsPortalStaffApiToEntity,
};
