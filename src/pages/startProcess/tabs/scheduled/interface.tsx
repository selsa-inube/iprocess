import { MdSearch } from "react-icons/md";
import { Stack } from "@inubekit/stack";
import { Textfield } from "@inubekit/textfield";

import { Table } from "@components/data/Table";

import {
  actions,
  breakPoints,
  scheduledNormailzeEntries,
  titlesConfig,
} from "./config/table.config";
import { StartProcesses } from "../../types";
import { ChangePeriod } from "@src/components/feedback/ChangePeriod";

interface ScheduledTabUIProps {
  description: string;
  entries: StartProcesses[];
  loading: boolean;
  searchScheduled: string;
  handleSearchScheduled: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleOrderData: () => void;
}

function ScheduledTabUI(props: ScheduledTabUIProps) {
  const {
    description,
    entries,
    loading,
    searchScheduled,
    handleSearchScheduled,
    handleOrderData,
  } = props;

  return (
    <Stack gap="32px" direction="column">
      <Stack justifyContent="space-between">
        <ChangePeriod
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
