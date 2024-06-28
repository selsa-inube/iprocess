import { useState } from "react";

import { StartProcessUI } from "./interface";
import { startProcessTabsConfig } from "./config/tabs.config";

function StartProcess() {
  const [isSelected, setIsSelected] = useState<string>();

  const handleTabChange = (tabId: string) => {
    setIsSelected(tabId);
  };

  return (
    <StartProcessUI
      isSelected={isSelected || startProcessTabsConfig.scheduled.id}
      handleTabChange={handleTabChange}
    />
  );
}

export { StartProcess };
