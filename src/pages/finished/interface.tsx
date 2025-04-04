import {
  useMediaQuery,
  Stack,
  Text,
  Input,
  Breadcrumbs,
} from "@inubekit/inubekit";

import { ChangePeriod } from "@components/feedback/ChangePeriod";
import { tokens } from "@design/tokens";
import { monthNormalize } from "@utils/dates";
import { mediaQueryMobile } from "@config/environment";
import { IProcess } from "@components/feedback/CardProcess/types";
import { CardProcessGroup } from "@components/feedback/CardProcessGroup";
import { CardProcess } from "@components/feedback/CardProcess";
import { IChangePeriodEntry, IListPeriods } from "../startProcess/types";
import { normailzeFinished } from "./config/card.config";
import { crumbsFinished } from "./config/navigation";

interface FinishedUIProps {
  entries: IProcess[];
  isLoading: boolean;
  month: string;
  searchFinished: string;
  year: string;
  listOfPeriods: IListPeriods[];
  setSelectedPeriod: (show: IChangePeriodEntry) => void;
  handleSearchFinished: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function FinishedUI(props: FinishedUIProps) {
  const {
    entries,
    isLoading,
    listOfPeriods,
    month,
    searchFinished,
    year,
    setSelectedPeriod,
    handleSearchFinished,
  } = props;

  const normalizedPeriods = listOfPeriods.map((period) => ({
    id: `${period.numberMonth.toString()}-${period.year.toString()}`,
    label: `${monthNormalize[period.month]} ${period.year}`,
  }));

  const smallScreen = useMediaQuery(mediaQueryMobile);

  return (
    <Stack
      direction="column"
      width="-webkit-fill-available"
      padding={
        smallScreen
          ? `${tokens.spacing.s300}`
          : `${tokens.spacing.s400} ${tokens.spacing.s800}`
      }
    >
      <Stack gap={tokens.spacing.s600} direction="column">
        <Stack gap={tokens.spacing.s300} direction="column">
          <Breadcrumbs crumbs={crumbsFinished} />
          <Text type="title" size={smallScreen ? "medium" : "large"}>
            Finalizados
          </Text>
        </Stack>
        <Stack gap={tokens.spacing.s400} direction="column">
          <Stack
            justifyContent="space-between"
            direction={smallScreen ? "column" : "row"}
            gap={
              smallScreen ? `${tokens.spacing.s150}` : `${tokens.spacing.s0}`
            }
          >
            <ChangePeriod
              description={`Procesos del mes de ${month} ${year}`}
              listOfPeriods={normalizedPeriods}
              setSelectedPeriod={setSelectedPeriod}
            />

            <Input
              name="searchFinished"
              id="searchFinished"
              placeholder="Palabra clave..."
              type="search"
              size="compact"
              value={searchFinished}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleSearchFinished(e)
              }
            />
          </Stack>
          {isLoading ? (
            <Stack gap={tokens.spacing.s200} width="100%" wrap="wrap">
              <CardProcess isLoading={isLoading} />
              <CardProcess isLoading={isLoading} />
            </Stack>
          ) : (
            <CardProcessGroup
              entries={normailzeFinished(entries)}
              filter={searchFinished}
              attributes={[
                "description",
                "date",
                "totalPerson",
                "totalPersonsProsecuted",
              ]}
              optionCurrent="finished"
              pathDetailByDay="/"
            />
          )}
        </Stack>
      </Stack>
    </Stack>
  );
}

export { FinishedUI };
