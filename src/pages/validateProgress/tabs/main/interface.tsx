import { MdSearch } from "react-icons/md";
import { Stack } from "@inubekit/stack";
import { Textfield } from "@inubekit/textfield";

import { Table } from "@components/data/Table";
import { IChangePeriodEntry } from "@components/modals/ChangePeriodModal/types";
import { ChangePeriod } from "@src/components/feedback/ChangePeriod";
import { periodLaterYears, periodPreviousYears } from "@src/config/environment";

import {
  actions,
  breakPoints,
  scheduledNormailzeEntries,
  titlesConfig,
} from "./config/table.config";
import { ValidateProgresses } from "../../types";

interface MainTabUIProps {
  description: string;
  entries: ValidateProgresses[];
  loading: boolean;
  searchScheduled: string;
  selectedMonth: string;
  selectedYear: string;
  setSelectedDate: (show: IChangePeriodEntry) => void;
  handleSearchScheduled: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleOrderData: () => void;
}

function MainTabUI(props: MainTabUIProps) {
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
    <Stack gap="32px" direction="column">
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
        actions={actions}
        entries={scheduledNormailzeEntries(entries)}
        breakpoints={breakPoints}
        loading={loading}
        filter={searchScheduled}
        widthFirstColumn="55%"
      />
    </Stack>
  );
}

export { MainTabUI };
