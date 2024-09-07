import { MdSearch } from "react-icons/md";
import { Stack } from "@inubekit/stack";
import { Textfield } from "@inubekit/textfield";

import { tokens } from "@design/tokens";
import { CardProcess } from "@components/feedback/CardProcess";
import { formatMonthEndpoint } from "@utils/dates";
import { onDemandNormailzeEntries } from "./config/card.config";
import { StartProcesses } from "../../types";
import { CardProcessGroup } from "@src/components/feedback/CardProcessGroup";

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

  const formatMonth = formatMonthEndpoint(month);
  const formatYear = Number(year);

  return (
    <Stack direction="column" gap={tokens.spacing.s600}>
      <Stack gap={tokens.spacing.s400} direction="column">
        <Stack justifyContent="flex-start">
          <Textfield
            name="searchOnDemand"
            id="searchOnDemand"
            placeholder="Búsqueda..."
            type="search"
            iconBefore={<MdSearch />}
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
