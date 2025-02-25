import { useMediaQuery, Stack } from "@inubekit/inubekit";
import { Breadcrumbs } from "@inubekit/breadcrumbs";
import { Input } from "@inubekit/input";

import { IDailyDetail } from "@pages/startProcess/types";
import { IAction } from "@components/data/Table/props";
import { Table } from "@components/data/Table";
import { tokens } from "@design/tokens";
import { Title } from "@design/data/Title";
import {
  actionsConfig,
  actionsResponsiveConfig,
  breakPoints,
  infoDataTable,
  processesDailyNormailzeEntries,
  titlesConfig,
} from "./config/tableDetails.config";
import { crumbsStartProcessesDaily } from "./config/navigation";

interface StartProcessesDailyUIProps {
  descriptionProcess: string;
  nameAplication: string;
  entries: IDailyDetail[];
  loading: boolean;
  month: number;
  searchProcessDaily: string;
  status: string;
  urlParams: string;
  year: number;
  handleOrderData: () => void;
  OnSearchProcessDaily: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setStatus: (status: string) => void;
}

function StartProcessesDailyUI(props: StartProcessesDailyUIProps) {
  const {
    descriptionProcess,
    nameAplication,
    entries,
    loading,
    month,
    searchProcessDaily,
    urlParams,
    year,
    handleOrderData,
    OnSearchProcessDaily,
    status,
    setStatus,
  } = props;

  const tabletScreen = useMediaQuery("(max-width: 850px)");

  return (
    <Stack
      direction="column"
      width="-webkit-fill-available"
      padding={
        tabletScreen
          ? `${tokens.spacing.s200}`
          : `${tokens.spacing.s400} ${tokens.spacing.s800}`
      }
    >
      <Stack gap={tokens.spacing.s300} direction="column">
        <Breadcrumbs crumbs={crumbsStartProcessesDaily} />
        <Stack gap={tokens.spacing.s400} direction="column">
          <Stack
            justifyContent="space-between"
            alignItems={tabletScreen ? "start" : "center"}
            direction={tabletScreen ? "column" : "row"}
          >
            <Title
              sizeTitle={tabletScreen ? "small" : "medium"}
              title={descriptionProcess}
            />

            <Input
              name="searchProcessDaily"
              id="searchProcessDaily"
              placeholder="Palabra clave..."
              type="search"
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
            actions={actionsConfig(urlParams, nameAplication) as IAction[]}
            actionsResponsive={
              actionsResponsiveConfig(urlParams, nameAplication, status,
                setStatus) as IAction[]
            }
            infoData={infoDataTable}
            entries={processesDailyNormailzeEntries(
              entries,
              month,
              year,
              status,
              setStatus
            )}
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
