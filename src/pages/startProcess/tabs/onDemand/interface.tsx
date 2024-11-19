import { Stack } from "@inubekit/stack";
import { useMediaQuery } from "@inubekit/hooks";
import { Input } from "@inubekit/input";

import { tokens } from "@design/tokens";
import { CardProcessGroup } from "@components/feedback/CardProcessGroup";
import { CardProcess } from "@components/feedback/CardProcess";
import { formatMonthEndpoint } from "@utils/dates";
import { onDemandNormailzeEntries } from "./config/card.config";
import { StartProcesses } from "../../types";

interface OnDemandTabUIProps {
  entries: StartProcesses[];
  isLoading: boolean;
  searchOnDemand: string;
  month: string;
  year: string;
  status: string;
  setStatus: (status: string) => void;
  handlesearchOnDemand: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function OnDemandTabUI(props: OnDemandTabUIProps) {
  const {
    entries,
    isLoading,
    searchOnDemand,
    month,
    year,
    status,
    setStatus,
    handlesearchOnDemand,
  } = props;

  const smallScreen = useMediaQuery("(max-width: 690px)");
  const formatMonth = formatMonthEndpoint(month);
  const formatYear = Number(year);

  return (
    <Stack
      direction="column"
      gap={smallScreen ? `${tokens.spacing.s300}` : `${tokens.spacing.s600}`}
      justifyContent= {smallScreen ? "center" : "normal"}
    >
      <Stack gap={tokens.spacing.s400} direction="column">
        <Stack justifyContent="flex-start">
          <Input
            name="searchOnDemand"
            id="searchOnDemand"
            placeholder="Búsqueda..."
            type="search"
            size="compact"
            value={searchOnDemand}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handlesearchOnDemand(e)
            }
          />
        </Stack>
      </Stack>
      {isLoading ? (
        <Stack gap={tokens.spacing.s200} width="100%" wrap="wrap">
          <CardProcess isLoading={isLoading} />
          <CardProcess isLoading={isLoading} />
        </Stack>
      ) : (
        <CardProcessGroup
          entries={onDemandNormailzeEntries(
            entries,
            formatMonth,
            formatYear,
            status,
            setStatus
          )}
          month={month}
          year={year}
          filter={searchOnDemand}
          attributes={["description", "statusText", "date"]}
          optionCurrent="start process"
          descriptionTooltip="Puede hacer clic en el botón para prevalidar los requisitos."
        />
      )}
    </Stack>
  );
}

export { OnDemandTabUI };
