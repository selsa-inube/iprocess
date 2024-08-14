import { MdSearch } from "react-icons/md";
import { Stack } from "@inubekit/stack";
import { Textfield } from "@inubekit/textfield";

import { StartProcesses} from "../../types";

interface OnDemandTabUIProps {
  description: string;
  entries: StartProcesses[];
  loading: boolean;
  searchOnDemand: string;
  handlesearchOnDemand: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function OnDemandTabUI(props: OnDemandTabUIProps) {
  const {
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
    </Stack>
  );
}

export { OnDemandTabUI };
