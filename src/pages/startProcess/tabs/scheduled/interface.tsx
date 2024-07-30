import { MdSearch } from "react-icons/md";
import { Stack } from "@inubekit/stack";
import { Textfield } from "@inubekit/textfield";

import { Table } from "@components/data/Table";
import { IChangePeriodEntry } from "@components/modals/ChangePeriodModal/types";
import { ChangePeriod } from "@src/components/feedback/ChangePeriod";
import { periodLaterYears, periodPreviousYears } from "@src/config/environment";

import {
  actionsConfig,
  breakPoints,
  scheduledNormailzeEntries,
  titlesConfig,
} from "./config/table.config";
import { StartProcesses } from "../../types";
import { tokens } from "@src/design/tokens";

interface ScheduledTabUIProps {
  description: string;
  entries: StartProcesses[];
  loading: boolean;
  searchScheduled: string;
  selectedMonth: string;
  selectedYear: string;
  setSelectedDate: (show: IChangePeriodEntry) => void;
  handleSearchScheduled: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleOrderData: () => void;
}

function ScheduledTabUI(props: ScheduledTabUIProps) {
  const {
    description,
    entries,
    loading,
    searchScheduled,
    selectedMonth,
    selectedYear,
    setSelectedDate,
    handleSearchScheduled,
    handleOrderData,
  } = props;

  return (
    <Stack gap={tokens.spacing.s400} direction="column">
      <Stack justifyContent="space-between">
        <ChangePeriod
          laterYears={periodLaterYears}
          previousYears={periodPreviousYears}
          setSelectedDate={setSelectedDate}
          description={description}
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
        />

        <Textfield
          name="searchScheduled"
          id="searchScheduled"
          placeholder="Búsqueda..."
          type="search"
          iconBefore={<MdSearch />}
          size="compact"
          value={searchScheduled}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleSearchScheduled(e)
          }
        />
      </Stack>
      <Table
        id="portal"
        titles={titlesConfig(handleOrderData)}
        actions={actionsConfig(selectedMonth, selectedYear)}
        entries={scheduledNormailzeEntries(entries)}
        breakpoints={breakPoints}
        loading={loading}
        filter={searchScheduled}
        widthFirstColumn="55%"
      />
    </Stack>
  );
}

export { ScheduledTabUI };
