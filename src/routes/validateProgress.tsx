import { Route, Routes } from "react-router-dom";
import { ValidateProgress } from "@src/pages/validateProgress";

function ValidateProgressRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ValidateProgress />} />
    </Routes>
  );
}

export { ValidateProgressRoutes };