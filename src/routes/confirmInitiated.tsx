import { Route, Routes } from "react-router-dom";
import { ConfirmInitiated } from "@pages/confirmInitiated";

function ConfirmInitiatedRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ConfirmInitiated />} />
    </Routes>
  );
}

export { ConfirmInitiatedRoutes };