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
  onDemandNormailzeEntries,
  titlesConfig,
} from "./config/table.config";
import { StartProcesses} from "../../types";

interface OnDemandTabUIProps {
  description: string;
  entries: StartProcesses[];
  loading: boolean;
  searchOnDemand: string;
  selectedMonth: string;
  selectedYear: string;
  setSelectedDate: (show: IChangePeriodEntry) => void;
  handlesearchOnDemand: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleOrderData: () => void;
}

function OnDemandTabUI(props: OnDemandTabUIProps) {
  const {
    description,
    entries,
    loading,
    searchOnDemand,
    selectedMonth,
    selectedYear,
    setSelectedDate,
    handlesearchOnDemand,
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
      <Table
        id="portal"
        titles={titlesConfig(handleOrderData)}
        actions={actions}
        entries={onDemandNormailzeEntries(entries)}
        breakpoints={breakPoints}
        loading={loading}
        filter={searchOnDemand}
        widthFirstColumn="55%"
      />
    </Stack>
  );
}

export { OnDemandTabUI };
