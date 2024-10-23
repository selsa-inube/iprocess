import { Route, Routes } from "react-router-dom";
import { useContext } from "react";

import { ErrorPage } from "@components/layout/ErrorPage";
import { IBusinessUnit } from "@pages/selectBusinessUnits/outlets/BusinessUnit/types";
import { SelectBusinessUnits } from "@pages/selectBusinessUnits";
import { BusinessUnits } from "@pages/selectBusinessUnits/outlets/BusinessUnit";
import { CheckingCredentials } from "@pages/selectBusinessUnits/outlets/CheckingCredentials";
import { AppContext } from "@context/AppContext";
import { LoadingApp } from "@components/feedback/LoadingApp";
import { ErrorNotBusinessUnit } from "@pages/selectBusinessUnits/errors/ErrorNotBusinessUnit";

export interface IBusinessUnits {
  businessUnits: IBusinessUnit[];
}
function SelectBusinessUnitsRoutes() {
  const { businessUnitsToTheStaff } = useContext(AppContext);
  const businessUnits = businessUnitsToTheStaff;

  return (
    <Routes>
      <Route path="/" element={<SelectBusinessUnits />}>
        <Route
          path="/checking-credentials"
          element={<CheckingCredentials businessUnits={businessUnits} />}
        />
        <Route
          path="/businessUnits"
          element={<BusinessUnits businessUnits={businessUnits} />}
        />
        <Route path="loading-app" element={<LoadingApp />} />
      </Route>
      <Route path="error/not-available" element={<ErrorPage />} />
      <Route
        path="error/not-related-businessUnits"
        element={<ErrorNotBusinessUnit />}
      />
      <Route path="*" element={<ErrorPage />} />
      <Route path="/*" element={<ErrorPage />} />
    </Routes>
  );
}

export { SelectBusinessUnitsRoutes };
