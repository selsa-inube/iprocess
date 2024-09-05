import { MdSearch } from "react-icons/md";
import { Stack } from "@inubekit/stack";
import { Textfield } from "@inubekit/textfield";
import { Breadcrumbs } from "@inubekit/breadcrumbs";
import { useMediaQuery } from "@inubekit/hooks";

import { IDailyDetail } from "@pages/startProcess/types";
import { Table } from "@components/data/Table";
import { tokens } from "@design/tokens";
import { mediaQueryMobile } from "@config/environment";
import { Title } from "@design/data/Title";
import {
  actions,
  breakPoints,
  processesDailyNormailzeEntries,
  titlesConfig,
} from "./config/tableDetails.config";
import { crumbsStartProcessesDaily } from "./config/navigation";

interface StartProcessesDailyUIProps {
  descriptionProcess: string;
  entries: IDailyDetail[];
  loading: boolean;
  month: number;
  searchProcessDaily: string;
  status: string;
  year: number;
  handleOrderData: () => void;
  OnSearchProcessDaily: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setStatus: (status: string) => void;
}

function StartProcessesDailyUI(props: StartProcessesDailyUIProps) {
  const {
    descriptionProcess,
    entries,
    loading,
    month,
    searchProcessDaily,
    year,
    handleOrderData,
    OnSearchProcessDaily,
    status,
    setStatus,
  } = props;

  const smallScreen = useMediaQuery(mediaQueryMobile);

  return (
    <Stack
      direction="column"
      width="-webkit-fill-available"
      padding={
        smallScreen
          ? `${tokens.spacing.s600}`
          : `${tokens.spacing.s400} ${tokens.spacing.s800}`
      }
    >
      <Stack gap={tokens.spacing.s300} direction="column">
        <Breadcrumbs crumbs={crumbsStartProcessesDaily} />
        <Stack gap={tokens.spacing.s400} direction="column">
          <Stack justifyContent="space-between" alignItems="center">
            <Title title={descriptionProcess} navigatePage="/" />

            <Textfield
              name="searchProcessDaily"
              id="searchProcessDaily"
              placeholder="Búsqueda..."
              type="search"
              iconBefore={<MdSearch />}
              size="compact"
              value={searchProcessDaily}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                OnSearchProcessDaily(e)
              }
            />
          </Stack>
          <Table
            id="portal"
            titles={titlesConfig(handleOrderData)}
            actions={actions}
            entries={processesDailyNormailzeEntries(entries, month, year, status, setStatus)}
            breakpoints={breakPoints}
            isLoading={loading}
            filter={searchProcessDaily}
            widthFirstColumn="55%"
          />
        </Stack>
      </Stack>
    </Stack>
  );
}

export { StartProcessesDailyUI };
