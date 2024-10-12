import { IBusinessManagers} from "@ptypes/staffPortalBusiness.types";
import { businessManagers } from "@services/staffPortal/getBusinessManager";


const validateBusinessManagers = async (
  code: string
): Promise<IBusinessManagers> => {
  const newData = await businessManagers(code);
  return newData;
};


export { validateBusinessManagers,  };
