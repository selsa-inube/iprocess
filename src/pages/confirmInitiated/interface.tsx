import { MdSearch } from "react-icons/md";
import { Stack } from "@inubekit/stack";
import { Textfield } from "@inubekit/textfield";
import { Text } from "@inubekit/text";
import { useMediaQuery } from "@inubekit/hooks";

import { Table } from "@components/data/Table";
import { tokens } from "@src/design/tokens";
import {
  actions,
  breakPoints,
  titlesConfig,
  confirmInitialtedNormailzeEntries,
} from "./config/table.config";
import { IConfirmInitiated } from "./types";


interface ConfirmInitiatedUIProps {
  entries: IConfirmInitiated[];
  loading: boolean;
  searchConfirmInitiated: string;
  onSearchConfirmInitiated: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  onOrderData: () => void;
}

function ConfirmInitiatedUI(props: ConfirmInitiatedUIProps) {
  const {
    entries,
    loading,
    searchConfirmInitiated,
    onSearchConfirmInitiated,
    onOrderData,
  } = props;

  const smallScreen = useMediaQuery("(max-width: 580px)");

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
          <Text type="title" size={smallScreen ? "medium" : "large"}>
            Confirmar Iniciados
          </Text>
        </Stack>
        <Stack gap={tokens.spacing.s400} direction="column">
          <Stack justifyContent="flex-start">
            <Textfield
              name="searchConfirmInitiated"
              id="searchConfirmInitiated"
              placeholder="Búsqueda..."
              type="search"
              iconBefore={<MdSearch />}
              size="compact"
              value={searchConfirmInitiated}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                onSearchConfirmInitiated(e)
              }
            />
          </Stack>
          <Table
            id="portal"
            titles={titlesConfig(onOrderData)}
            actions={actions}
            entries={confirmInitialtedNormailzeEntries(entries)}
            breakpoints={breakPoints}
            loading={loading}
            filter={searchConfirmInitiated}
            widthFirstColumn="55%"
          />
        </Stack>
      </Stack>
    </Stack>
  );
}

export { ConfirmInitiatedUI };
