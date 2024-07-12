import { MdSearch } from "react-icons/md";
import { Stack } from "@inubekit/stack";
import { Textfield } from "@inubekit/textfield";

import { Table } from "@components/data/Table";
import { IChangePeriodEntry } from "@components/modals/ChangePeriodModal/types";

import {
  actionsOnDemand,
  breakPointsOnDemand,
  onDemandNormailzeEntries,
  titlesOnDemand,
} from "./config/table.config";
import { IStartProcessesData} from "../../types";

interface OnDemandTabUIProps {
  description: string;
  entries: IStartProcessesData[];
  loading: boolean;
  searchOnDemand: string;
  selectedMonth: string;
  selectedYear: string;
  setSelectedDate: (show: IChangePeriodEntry) => void;
  handlesearchOnDemand: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleOrderData?: () => void;
}

function OnDemandTabUI(props: OnDemandTabUIProps) {
  const {
    entries,
    loading,
    searchOnDemand,
 
    handlesearchOnDemand,

  } = props;

  return (
    <Stack gap="32px" direction="column">
      <Stack justifyContent="flex-end">
       
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
        titles={titlesOnDemand}
        actions={actionsOnDemand}
        entries={onDemandNormailzeEntries(entries)}
        breakpoints={breakPointsOnDemand}
        loading={loading}
        filter={searchOnDemand}
        widthFirstColumn="68%"
      />
    </Stack>
  );
}

export { OnDemandTabUI };
