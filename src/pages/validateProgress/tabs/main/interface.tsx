import { MdSearch } from "react-icons/md";
import { Stack } from "@inubekit/stack";
import { Textfield } from "@inubekit/textfield";

import { Table } from "@components/data/Table";
import { IChangePeriodEntry } from "@components/modals/ChangePeriodModal/types";
import { ChangePeriod } from "@components/feedback/ChangePeriod";
import { periodLaterYears, periodPreviousYears } from "@src/config/environment";

import {
  actions,
  breakPoints,
  mainNormailzeEntries,
  titlesConfig,
} from "./config/table.config";
import { ValidateProgresses } from "../../types";

interface MainTabUIProps {
  description: string;
  entries: ValidateProgresses[];
  loading: boolean;
  searchMain: string;
  selectedMonth: string;
  selectedYear: string;
  setSelectedDate: (show: IChangePeriodEntry) => void;
  handleSearchMain: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleOrderData: () => void;
}

function MainTabUI(props: MainTabUIProps) {
  const {
    description,
    entries,
    loading,
    searchMain,
    selectedMonth,
    selectedYear,
    setSelectedDate,
    handleSearchMain,
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
          name="searchMain"
          id="searchMain"
          placeholder="Búsqueda..."
          type="search"
          iconBefore={<MdSearch />}
          size="compact"
          value={searchMain}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleSearchMain(e)
          }
        />
      </Stack>
      <Table
        id="portal"
        titles={titlesConfig(handleOrderData)}
        actions={actions}
        entries={mainNormailzeEntries(entries)}
        breakpoints={breakPoints}
        loading={loading}
        filter={searchMain}
        widthFirstColumn="45%"
      />
    </Stack>
  );
}

export { MainTabUI };
