import { MdSearch } from "react-icons/md";
import { Stack } from "@inubekit/stack";
import { Textfield } from "@inubekit/textfield";

import { ChangePeriod } from "@components/feedback/ChangePeriod";
import { IChangePeriodEntry } from "@components/modals/ChangePeriodModal/types";
import { StartProcesses } from "../../types";
import { tokens } from "@src/design/tokens";

interface ScheduledTabUIProps {
  description: string;
  entries: StartProcesses[];
  loading: boolean;
  searchScheduled: string;
  setSelectedPeriod: (show: IChangePeriodEntry) => void;
  handleSearchScheduled: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function ScheduledTabUI(props: ScheduledTabUIProps) {
  const {
    description,
    searchScheduled,
    setSelectedPeriod,
    handleSearchScheduled,
  } = props;

  return (
    <Stack gap={tokens.spacing.s400} direction="column">
      <Stack justifyContent="space-between">
        <ChangePeriod
          description={description}
          setSelectedPeriod={setSelectedPeriod}
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
    </Stack>
  );
}

export { ScheduledTabUI };
