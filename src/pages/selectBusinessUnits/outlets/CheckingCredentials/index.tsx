import { useNavigate } from "react-router-dom";
import { useCallback, useContext, useEffect } from "react";

import { AppContext } from "@context/AppContext";
import { IBusinessUnitsPortalStaff } from "@ptypes/staffPortalBusiness.types";
import { CheckingCredentialsUI } from "./interface";

function CheckingCredentials({
  businessUnits,
}: {
  businessUnits: IBusinessUnitsPortalStaff[];
}) {
  const navigate = useNavigate();
  const { appData, setBusinessUnitSigla } = useContext(AppContext);

  const selectedBusinessUnit = () => {
    const selected = businessUnits[0];
    setBusinessUnitSigla(JSON.stringify(selected));
    navigate("/selectBusinessUnit/loading-app");
  };

  const checkCredentials = useCallback(async () => {
    try {
      if (!appData) {
        return;
      }

      if (appData) {
        if (!businessUnits || businessUnits.length === 0) {
          navigate("/selectBusinessUnit/error/not-related-businessUnits");
        } else if (businessUnits.length === 1) {
          selectedBusinessUnit();
        } else {
          navigate(
            `/selectBusinessUnit/businessUnits`
          );
        }
      } else {
        navigate("/selectBusinessUnit/error/not-available");
      }
    } catch (error) {
      navigate("/selectBusinessUnit/error/not-available");
    }
  }, [appData, navigate, businessUnits]);

  useEffect(() => {
    const timer = setTimeout(checkCredentials, 2000);
    return () => clearTimeout(timer);
  }, [checkCredentials]);

  return <CheckingCredentialsUI />;
}

export { CheckingCredentials };
