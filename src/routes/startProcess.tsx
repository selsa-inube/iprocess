import { Route, Routes } from "react-router-dom";

import { StartProcess } from "@pages/startProcess";

function StartProcessRoutes() {
  return (
    <Routes>
      <Route path="/" element={<StartProcess />} />
    </Routes>
  );
}

export { StartProcessRoutes };
