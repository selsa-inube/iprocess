import { businessUnitsPortalStaff } from "@services/staffPortal/getBusinessUnits";
import { IBusinessUnitsPortalStaff } from "@ptypes/staffPortalBusiness.types";

export const validateBusinessUnities = async (
  publicCode: string,
  userAccount: string
): Promise<IBusinessUnitsPortalStaff[]> => {
  const newData = await businessUnitsPortalStaff(publicCode, userAccount);

  return newData;
};
