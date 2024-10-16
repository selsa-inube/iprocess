import { Route, Routes } from "react-router-dom";

import clientNotFound from "@assets/images/Expired.png";
import { ErrorPage } from "@components/layout/ErrorPage";
import { businessUnitDataMock } from "@mocks/businessUnits/businessUnits.mock";
import { IBusinessUnit } from "@pages/selectBusinessUnits/outlets/BusinessUnit/types";
import { SelectBusinessUnits } from "@pages/selectBusinessUnits";
import { BusinessUnits } from "@pages/selectBusinessUnits/outlets/BusinessUnit";
import { CheckingCredentials } from "@pages/selectBusinessUnits/outlets/CheckingCredentials";
import { LoadingApp } from "@components/feedback/LoadingApp";

export interface IBusinessUnits {
  businessUnits: IBusinessUnit[];
}
function SelectBusinessUnitsRoutes() {
  const businessUnits = businessUnitDataMock;
  return (
    <Routes>
      <Route path="/" element={<SelectBusinessUnits />}>
        <Route
          path="/:user_id/checking-credentials"
          element={<CheckingCredentials businessUnits={businessUnits} />}
        />
        <Route
          path="/:user_id/businessUnits"
          element={<BusinessUnits businessUnits={businessUnits} />}
        />
        <Route path="loading-app" element={<LoadingApp />} />
      </Route>
      <Route path="error/not-available" element={<ErrorPage />} />
      <Route
        path="error/not-related-businessUnits"
        element={
          <ErrorPage
            image={clientNotFound}
            imageAlt="Unidad de negocio no encontrada"
            heading="No hay resultados..."
            description="Su usuario no tiene unidades de negocio relacionados, consulte con su administrador."
          />
        }
      />
      <Route path="/*" element={<ErrorPage />} />
    </Routes>
  );
}

export { SelectBusinessUnitsRoutes };
