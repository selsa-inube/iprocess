import { MdSearch } from "react-icons/md";
import { Stack } from "@inubekit/stack";
import { Textfield } from "@inubekit/textfield";
import { Text } from "@inubekit/text";

import { ChangePeriod } from "@components/feedback/ChangePeriod";
import { CardProcess } from "@components/feedback/CardProcess";
import { tokens } from "@src/design/tokens";
import { IChangePeriodEntry, StartProcesses } from "../../types";
import { scheduledNormailzeEntries } from "./config/card.config";


interface ScheduledTabUIProps {
  description: string;
  entries: StartProcesses[];
  isLoading: boolean;
  searchScheduled: string;
  setSelectedPeriod: (show: IChangePeriodEntry) => void;
  handleSearchScheduled: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function ScheduledTabUI(props: ScheduledTabUIProps) {
  const {
    description,
    entries,
    isLoading,
    searchScheduled,
    setSelectedPeriod,
    handleSearchScheduled,
  } = props;

  return (
    <Stack direction="column" gap={tokens.spacing.s600}>
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

      {isLoading ? (
        <Stack gap={tokens.spacing.s200} width="100%" wrap="wrap">
          <CardProcess isLoading={isLoading} />
          <CardProcess isLoading={isLoading} />
        </Stack>
      ) : (
        <>
          {entries.length > 0 ? (

      <Stack gap={tokens.spacing.s200} width="100%" wrap="wrap">
        {scheduledNormailzeEntries(entries).map(
          (entry: StartProcesses, index) => (
            <Stack key={index}>
              <CardProcess
                entries={entry}
                optionCurrent="start process"
                descriptionTooltip="Puede hacer clic en el botón para prevalidar los requisitos."
                pathDetailByDay="/"
              />
            </Stack>
          )
        )}
      </Stack>
         ) : (
          <Text type="body" size="medium">
            No se encontró información
          </Text>
        )}
      </>
    )}
    </Stack>
    
  );
}

export { ScheduledTabUI };
