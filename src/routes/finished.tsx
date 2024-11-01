import { Route, Routes } from "react-router-dom";
import { Finished } from "@pages/finished";

function FinishedRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Finished />} />
    </Routes>
  );
}

export { FinishedRoutes };