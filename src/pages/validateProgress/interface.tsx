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
import { normailzeValidateProgress } from "./config/card.config";
import { crumbsValidateProgress } from "./config/navigation";

interface ValidateProgressUIProps {
  entries: IProcess[];
  isLoading: boolean;
  month: string;
  searchValidateProgress: string;
  year: string;
  listOfPeriods: IListPeriods[];
  setSelectedPeriod: (show: IChangePeriodEntry) => void;
  handleSearchValidateProgress: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

function ValidateProgressUI(props: ValidateProgressUIProps) {
  const {
    entries,
    isLoading,
    listOfPeriods,
    month,
    searchValidateProgress,
    year,
    setSelectedPeriod,
    handleSearchValidateProgress,
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
          <Breadcrumbs crumbs={crumbsValidateProgress} />
          <Text type="title" size={smallScreen ? "medium" : "large"}>
            Validar el progreso
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
              name="searchValidateProgress"
              id="searchValidateProgress"
              placeholder="Palabra clave..."
              type="search"
              size="compact"
              value={searchValidateProgress}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleSearchValidateProgress(e)
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
              entries={normailzeValidateProgress(entries)}
              filter={searchValidateProgress}
              attributes={[
                "description",
                "date",
                "totalPerson",
                "totalPersonsProsecuted",
              ]}
              optionCurrent="validate process"
              pathDetailByDay="/"
            />
          )}
        </Stack>
      </Stack>
    </Stack>
  );
}

export { ValidateProgressUI };
