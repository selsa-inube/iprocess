import { IBusinessManagers } from "@ptypes/staffPortalBusiness.types";


const mapBusinessManagerApiToEntity = (
  businessManager: Record<string, string | number | object>
): IBusinessManagers => {
  const business: IBusinessManagers = {
    id: String(businessManager.businessManagerId),
    publicCode: String(businessManager.publicCode),
    language: String(businessManager.languageId),
    abbreviatedName: String(businessManager.abbreviatedName),
    description: String(businessManager.descriptionUse),
    urlBrand: String(businessManager.urlBrand),
    urlLogo: String(businessManager.urlLogo),
    customerId: String(businessManager.customerId),
  };
  return business;
};

export { mapBusinessManagerApiToEntity };
