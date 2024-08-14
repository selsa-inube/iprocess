import { MdSearch } from "react-icons/md";
import { Stack } from "@inubekit/stack";
import { Textfield } from "@inubekit/textfield";

import { IChangePeriodEntry, StartProcesses} from "../../types";
import { ChangePeriod } from "@src/components/feedback/ChangePeriod";

interface OnDemandTabUIProps {
  description: string;
  entries: StartProcesses[];
  loading: boolean;
  searchOnDemand: string;
  handlesearchOnDemand: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setSelectedPeriod: (show: IChangePeriodEntry) => void;
}

function OnDemandTabUI(props: OnDemandTabUIProps) {
  const {
    searchOnDemand,
    description,
    handlesearchOnDemand,
    setSelectedPeriod,
  } = props;

  return (
    <Stack gap="32px" direction="column">
      <Stack justifyContent="space-between">

      <ChangePeriod
          description={description}
          setSelectedPeriod={setSelectedPeriod}
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
    </Stack>
  );
}

export { OnDemandTabUI };
