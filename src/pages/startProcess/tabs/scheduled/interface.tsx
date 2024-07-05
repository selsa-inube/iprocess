import { Stack } from "@inubekit/stack";
import { Textfield } from "@inubekit/textfield";
import { Table } from "@src/components/data/Table";
import { MdSearch } from "react-icons/md";
import { actions, breakPoints, scheduledNormailzeEntries, titlesConfig } from "./config/table.config";
import { StartProcesses } from "../../types";

interface ScheduledTabUIProps {
  entries: StartProcesses[];
  loading: boolean;
  searchScheduled: string;
  handleSearchScheduled: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleOrderData: () => void;
}

function ScheduledTabUI(props: ScheduledTabUIProps) {
  const { entries, loading, searchScheduled, handleSearchScheduled, handleOrderData } = props;
  return (
    <Stack gap="32px" direction="column">
      <Stack justifyContent="flex-end" >
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
