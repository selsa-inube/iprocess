import { useState, useEffect } from "react";

import { staffPortalByBusinessManager } from "@services/staffPortal/getStaffPortalByBusinessManager";
import { IStaffPortalByBusinessManager } from "@ptypes/staffPortalBusiness.types";

export const usePortalData = () => {
  const [portalData, setPortalData] = useState<IStaffPortalByBusinessManager[]>([]);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchPortalData = async () => {
      try {
        const StaffPortalData = await staffPortalByBusinessManager();
        setPortalData(StaffPortalData);
      } catch (error) {
        console.info(error);
        setHasError(true);
      }
    };

    fetchPortalData();
  }, []);

  return { portalData, hasError };
};