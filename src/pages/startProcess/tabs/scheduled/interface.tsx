import { Stack } from "@inubekit/stack";
import { useMediaQuery } from "@inubekit/hooks";
import { Input } from "@inubekit/input";

import { ChangePeriod } from "@components/feedback/ChangePeriod";
import { CardProcess } from "@components/feedback/CardProcess";
import { tokens } from "@design/tokens";
import { formatMonthEndpoint, monthNormalize } from "@utils/dates";
import { IProcess } from "@components/feedback/CardProcess/types";
import { CardProcessGroup } from "@components/feedback/CardProcessGroup";
import { IChangePeriodEntry, IListPeriods } from "../../types";
import { scheduledNormailzeEntries } from "./config/card.config";

interface ScheduledTabUIProps {
  entries: IProcess[];
  isLoading: boolean;
  month: string;
  searchScheduled: string;
  year: string;
  status: string;
  listOfPeriods: IListPeriods[];
  setStatus: (status: string) => void;
  setSelectedPeriod: (show: IChangePeriodEntry) => void;
  handleSearchScheduled: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function ScheduledTabUI(props: ScheduledTabUIProps) {
  const {
    entries,
    isLoading,
    month,
    listOfPeriods,
    searchScheduled,
    year,
    status,
    setStatus,
    setSelectedPeriod,
    handleSearchScheduled,
  } = props;

  const formatMonth = formatMonthEndpoint(month);
  const formatYear = Number(year);
  const smallScreen = useMediaQuery("(max-width: 690px)");

  const normalizedPeriods = listOfPeriods.map((period) => ({
    id: period.numberMonth.toString(),
    label: `${monthNormalize[period.month]} ${period.year}`,
  }));

  return (
    <Stack
      direction="column"
      gap={smallScreen ? `${tokens.spacing.s300}` : `${tokens.spacing.s600}`}
      justifyContent= {smallScreen ? "center" : "normal"}
    >
      <Stack gap={tokens.spacing.s400} direction="column">
        <Stack
          justifyContent={"space-between"} 
          direction={smallScreen ? "column" : "row"}
          gap={smallScreen ? `${tokens.spacing.s150}` :`${tokens.spacing.s0}`}
        >
          <ChangePeriod
            description={`Procesos del mes de ${month} ${year}`}
            listOfPeriods={normalizedPeriods}
            setSelectedPeriod={setSelectedPeriod}
          />

          <Input
            name="searchScheduled"
            id="searchScheduled"
            placeholder="Búsqueda..."
            type="search"
            size="compact"
            value={searchScheduled}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleSearchScheduled(e)
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
          entries={scheduledNormailzeEntries(
            entries,
            formatMonth,
            formatYear,
            status,
            setStatus
          )}
          month={month}
          year={year}
          filter={searchScheduled}
          attributes={["description", "periodicity", "statusText", "date"]}
          optionCurrent="start process"
          descriptionTooltip="Puede hacer clic en el botón para prevalidar los requisitos."
          pathDetailByDay={`start-process/startProcessesDaily`}
        />
      )}
    </Stack>
  );
}

export { ScheduledTabUI };