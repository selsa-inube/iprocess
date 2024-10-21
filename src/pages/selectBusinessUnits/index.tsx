import { useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AppContext } from "@context/AppContext";
import { SelectBusinessUnitsUI } from "./interface";

function SelectBusinessUnits() {
  const navigate = useNavigate();
  const location = useLocation();
  const { appData } = useContext(AppContext);

  useEffect(() => {
    if (
      location.pathname === "/selectBusinessUnit" ||
      location.pathname === "/selectBusinessUnit/" ||
      location.pathname === "/"
    ) {
      navigate(`/selectBusinessUnit/${appData.user.userAccount}/checking-credentials/`);
    }
  }, [location, navigate, appData]);

  return <SelectBusinessUnitsUI />;
}

export { SelectBusinessUnits };
