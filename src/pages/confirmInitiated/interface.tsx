import { MdSearch } from "react-icons/md";
import { Stack } from "@inubekit/stack";
import { Textfield } from "@inubekit/textfield";
import { Text } from "@inubekit/text";
import { useMediaQuery } from "@inubekit/hooks";

import { CardProcess } from "@components/feedback/CardProcess";
import { tokens } from "@design/tokens";
import { IProcess } from "@components/feedback/CardProcess/types";
import { CardProcessGroup } from "@components/feedback/CardProcessGroup";
import { mediaQueryMobile } from "@config/environment";
import { confirmInitiatedNormailzeEntries } from "./config/card.config";

interface ConfirmInitiatedUIProps {
  entries: IProcess[];
  isLoading: boolean;
  searchConfirmInitiated: string;
  handleSearchConfirmInitiated: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function ConfirmInitiatedUI(props: ConfirmInitiatedUIProps) {
  const {
    entries,
    isLoading,
    searchConfirmInitiated,
    handleSearchConfirmInitiated,
  } = props;

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
          Confirmar Iniciados
          </Text>
        </Stack>
        <Stack gap={tokens.spacing.s400} direction="column">
        <Stack>
          <Textfield
            name="searchConfirmInitiated"
            id="searchConfirmInitiated"
            placeholder="Búsqueda..."
            type="search"
            iconBefore={<MdSearch />}
            size="compact"
            value={searchConfirmInitiated}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleSearchConfirmInitiated(e)
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
          entries={confirmInitiatedNormailzeEntries(
            entries,
          )}
          filter={searchConfirmInitiated}
          attributes={["description", "statusText", "date", "totalPerson"]}
          optionCurrent="confirm initiated"
          descriptionTooltip="Puede hacer clic en el botón para prevalidar los requisitos."
          pathDetailByDay="/"
        />
      )}
        </Stack>
      </Stack>
    </Stack>
  );
}

export { ConfirmInitiatedUI };