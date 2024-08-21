import { Stack } from "@inubekit/stack";
import { Tabs } from "@inubekit/tabs";
import { useMediaQuery } from "@inubekit/hooks";
import { Text } from "@inubekit/text";

import { tokens } from "@src/design/tokens";
import { mediaQueryMobile } from "@src/config/environment";
import { startProcessTabsConfig } from "./config/tabs.config";
import { ScheduledTab } from "./tabs/scheduled";
import { OnDemandTab } from "./tabs/onDemand";

interface StartProcessUIProps {
  isSelected: string;
  handleTabChange: (id: string) => void;
}

function StartProcessUI(props: StartProcessUIProps) {
  const { isSelected, handleTabChange } = props;

  const smallScreen = useMediaQuery(mediaQueryMobile);

  return (
    <Stack
      direction="column"
      width="-webkit-fill-available"
      padding={smallScreen ? "24px" : "32px 64px"}
    >
      <Stack gap={tokens.spacing.s600} direction="column">
        <Stack gap={tokens.spacing.s300} direction="column">
          <Text type="title" size={smallScreen ? "medium" : "large"}>
            Procesos por Iniciar
          </Text>
        </Stack>
        <Stack gap={tokens.spacing.s400} direction="column">
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
