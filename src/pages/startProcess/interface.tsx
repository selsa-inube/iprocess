import { Stack } from "@inubekit/stack";
import { Tabs } from "@inubekit/tabs";
import { useMediaQuery } from "@inubekit/hooks";
import { Text } from "@inubekit/text";

import { startProcessTabsConfig } from "./config/tabs.config";
import { ScheduledTab } from "./tabs/scheduled";
import { OnDemandTab } from "./tabs/onDemand";

interface StartProcessUIProps {
  isSelected: string;
  handleTabChange: (id: string) => void;
}

function StartProcessUI(props: StartProcessUIProps) {
  const { isSelected, handleTabChange } = props;

  const smallScreen = useMediaQuery("(max-width: 580px)");

  return (
    <Stack
      direction="column"
      width="-webkit-fill-available"
      padding={smallScreen ? "s300" : "s400 s800"}
    >
      <Stack gap="48px" direction="column">
        <Stack gap="24px" direction="column">
          <Text type="title" size={smallScreen ? "medium" : "large"}>
            Iniciar Procesos
          </Text>
        </Stack>
        <Stack gap="32px" direction="column">
          <Tabs
            tabs={Object.values(startProcessTabsConfig)}
            selectedTab={isSelected}
            onChange={handleTabChange}
          />

          {isSelected === startProcessTabsConfig.scheduled.id && (
            <ScheduledTab />
          )}
          {isSelected === startProcessTabsConfig.onDemand.id && <OnDemandTab />}
        </Stack>
      </Stack>
    </Stack>
  );
}

export { StartProcessUI };
