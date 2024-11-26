import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { useMediaQuery } from "@inubekit/hooks";
import { Input } from "@inubekit/input";
import { Breadcrumbs } from "@inubekit/breadcrumbs";

import { CardProcess } from "@components/feedback/CardProcess";
import { tokens } from "@design/tokens";
import { IProcess } from "@components/feedback/CardProcess/types";
import { CardProcessGroup } from "@components/feedback/CardProcessGroup";
import { mediaQueryMobile } from "@config/environment";
import { confirmInitiatedNormailzeEntries } from "./config/card.config";
import { crumbsConfirmInitiated } from "./config/navigation";

interface ConfirmInitiatedUIProps {
  entries: IProcess[];
  isLoading: boolean;
  searchConfirmInitiated: string;
  status: string;
  handleSearchConfirmInitiated: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setStatus: (status: string) => void;
  setDeleteProcess: (processControlId: string) => void;
}

function ConfirmInitiatedUI(props: ConfirmInitiatedUIProps) {
  const {
    entries,
    isLoading,
    searchConfirmInitiated,
    setDeleteProcess,
    status,
    handleSearchConfirmInitiated,
    setStatus,
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
          <Breadcrumbs crumbs={crumbsConfirmInitiated}/>
          <Text type="title" size={smallScreen ? "medium" : "large"}>
          Confirmar Iniciados
          </Text>
        </Stack>
        <Stack gap={tokens.spacing.s400} direction="column">
        <Stack>
          <Input
            name="searchConfirmInitiated"
            id="searchConfirmInitiated"
            placeholder="Búsqueda..."
            type="search"
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
            status,
            setStatus,
            setDeleteProcess,
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