import { ConfirmInitiated } from "@src/pages/confirmInitiated";
import { Route, Routes } from "react-router-dom";

function ConfirmInitiatedRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ConfirmInitiated />} />
    </Routes>
  );
}

export { ConfirmInitiatedRoutes };