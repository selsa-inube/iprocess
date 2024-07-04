import { MdSearch } from "react-icons/md";
import { Stack } from "@inubekit/stack";
import { Textfield } from "@inubekit/textfield";

import { ChangeDate } from "@components/feedback/ChangeDate";
import { Table } from "@components/data/Table";
import { IChangeDateEntry } from "@components/modals/ChangeDateModal/types";

import {
  actions,
  breakPoints,
  scheduledNormailzeEntries,
  titlesConfig,
} from "./config/table.config";
import { StartProcesses } from "../../types";

interface ScheduledTabUIProps {
  entries: StartProcesses[];
  loading: boolean;
  searchScheduled: string;
  description: string;
  setSelectedDate: (show: IChangeDateEntry) => void;
  handleSearchScheduled: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleOrderData: () => void;
}

function ScheduledTabUI(props: ScheduledTabUIProps) {
  const {
    entries,
    loading,
    searchScheduled,
    description,
    setSelectedDate,
    handleSearchScheduled,
    handleOrderData,
  } = props;

  return (
    <Stack gap="32px" direction="column">
      <Stack justifyContent="space-between">
        <ChangeDate
          laterYears={3}
          previousYears={1}
          setSelectedDate={setSelectedDate}
          description={description}
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

export { ScheduledTabUI };
