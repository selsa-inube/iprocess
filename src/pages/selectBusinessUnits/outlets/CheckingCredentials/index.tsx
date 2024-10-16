import { useNavigate } from "react-router-dom";
import { useCallback, useContext, useEffect } from "react";

import { AppContext } from "@context/AppContext";
import { CheckingCredentialsUI } from "./interface";
import { IBusinessUnit } from "../BusinessUnit/types";


function CheckingCredentials({
  businessUnits,
}: {
  businessUnits: IBusinessUnit[];
}) {
  const navigate = useNavigate();
  const { appData } = useContext(AppContext);

  const checkCredentials = useCallback(async () => {
    try {
      if (!appData) {
        return;
      }

      if (appData) {
        if (!businessUnits || businessUnits.length === 0) {
          navigate("/selectBusinessUnit/error/not-related-businessUnits");
        } else if (businessUnits.length === 1) {
          navigate("/selectBusinessUnit/loading-app");
        } else {
          navigate(`/selectBusinessUnit/${appData.user.userAccount}/businessUnits`);
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
