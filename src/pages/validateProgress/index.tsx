import { useState } from "react";
import { ValidateProgressUI } from "./interface";
import { validateProgressTabsConfig } from "./config/tabs.config";

function ValidateProgress() {
  const [isSelected, setIsSelected] = useState<string>();
  const handleTabChange = (tabId: string) => {
    setIsSelected(tabId);
  };
  return (
    <ValidateProgressUI
    isSelected={isSelected || validateProgressTabsConfig.main.id}
    handleTabChange={handleTabChange}
    />
  );
}
export { ValidateProgress };
