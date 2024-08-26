import { Route, Routes } from "react-router-dom";

import { StartProcess } from "@pages/startProcess";
import { StartProcessesDaily } from "@pages/startProcess/tabs/scheduled/components/StartProcessesDaily";

function StartProcessRoutes() {
  return (
    <Routes>
      <Route path="/" element={<StartProcess />} />
      <Route
        path="startProcessesDaily/:month/:year/:process_id" 
        element={<StartProcessesDaily />}
      />

    </Routes>
  );
}

export { StartProcessRoutes };
