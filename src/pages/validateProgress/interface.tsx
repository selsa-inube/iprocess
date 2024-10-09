import { MdSearch } from "react-icons/md";
import { Stack } from "@inubekit/stack";
import { Textfield } from "@inubekit/textfield";
import { Text } from "@inubekit/text";
import { useMediaQuery } from "@inubekit/hooks";

import { ChangePeriod } from "@components/feedback/ChangePeriod";
import { tokens } from "@design/tokens";
import { monthNormalize } from "@utils/dates";
import { mediaQueryMobile } from "@config/environment";
import { IProcess } from "@components/feedback/CardProcess/types";
import { IChangePeriodEntry, IListPeriods } from "../startProcess/types";

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
    month,
    listOfPeriods,
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
      padding={smallScreen ? "24px" : "32px 64px"}
    >
      <Stack gap={tokens.spacing.s600} direction="column">
        <Stack gap={tokens.spacing.s300} direction="column">
          <Text type="title" size={smallScreen ? "medium" : "large"}>
            Validar el progreso
          </Text>
        </Stack>
        <Stack gap={tokens.spacing.s400} direction="column">
          <Stack justifyContent="space-between">
            <ChangePeriod
              description={`Procesos del mes de ${month} ${year}`}
              listOfPeriods={normalizedPeriods}
              setSelectedPeriod={setSelectedPeriod}
            />

            <Textfield
              name="searchValidateProgress"
              id="searchValidateProgress"
              placeholder="Búsqueda..."
              type="search"
              iconBefore={<MdSearch />}
              size="compact"
              value={searchValidateProgress}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleSearchValidateProgress(e)
              }
            />
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}

export { ValidateProgressUI };
