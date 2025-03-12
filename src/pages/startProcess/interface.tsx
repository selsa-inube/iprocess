import {
  useMediaQuery,
  Stack,
  Text,
  Breadcrumbs,
  Tabs,
} from "@inubekit/inubekit";

import { tokens } from "@design/tokens";
import { startProcessTabsConfig } from "./config/tabs.config";
import { ScheduledTab } from "./tabs/scheduled";
import { OnDemandTab } from "./tabs/onDemand";
import { crumbsStartProcess } from "./config/navigation";

interface StartProcessUIProps {
  isSelected: string;
  handleTabChange: (id: string) => void;
}

function StartProcessUI(props: StartProcessUIProps) {
  const { isSelected, handleTabChange } = props;

  const smallScreen = useMediaQuery("(max-width: 990px)");

  return (
    <Stack
      direction="column"
      width="-webkit-fill-available"
      padding={
        smallScreen
          ? `${tokens.spacing.s200}`
          : `${tokens.spacing.s400} ${tokens.spacing.s800}`
      }
    >
      <Stack gap={tokens.spacing.s600} direction="column">
        <Stack gap={tokens.spacing.s300} direction="column">
          <Breadcrumbs crumbs={crumbsStartProcess} />
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
