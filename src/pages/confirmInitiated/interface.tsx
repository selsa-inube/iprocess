import { MdSearch } from "react-icons/md";
import { Stack } from "@inubekit/stack";
import { Textfield } from "@inubekit/textfield";
import { Text } from "@inubekit/text";
import { useMediaQuery } from "@inubekit/hooks";

import { Table } from "@components/data/Table";
import { actions, breakPoints, titlesConfig } from "./config/table.config";
import { IConfirmInitiated } from "./types";
import { confirmInitialtedNormailzeEntries } from "./config/table.config";

interface ConfirmInitiatedUIProps {
  entries: IConfirmInitiated[];
  loading: boolean;
  searchConfirmInitiated: string;
  handleSearchConfirmInitiated: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  handleOrderData: () => void;
}

function ConfirmInitiatedUI(props: ConfirmInitiatedUIProps) {
  const {
    entries,
    loading,
    searchConfirmInitiated,
    handleSearchConfirmInitiated,
    handleOrderData,
  } = props;

  const smallScreen = useMediaQuery("(max-width: 580px)");

  return (
    <Stack
      direction="column"
      width="-webkit-fill-available"
      padding={smallScreen ? "24px" : "32px 64px"}
    >
      <Stack gap="48px" direction="column">
        <Stack gap="24px" direction="column">
          <Text type="title" size={smallScreen ? "medium" : "large"}>
            Confirmar Iniciados
          </Text>
        </Stack>
        <Stack gap="32px" direction="column">
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
                handleSearchConfirmInitiated(e)
              }
            />
          </Stack>
          <Table
            id="portal"
            titles={titlesConfig(handleOrderData)}
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

    // <Stack gap="32px" direction="column">
    //   <Stack justifyContent="flex-start">
    //     <Textfield
    //       name="searchConfirmInitiated"
    //       id="searchConfirmInitiated"
    //       placeholder="Búsqueda..."
    //       type="search"
    //       iconBefore={<MdSearch />}
    //       size="compact"
    //       value={searchConfirmInitiated}
    //       onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
    //         handleSearchConfirmInitiated(e)
    //       }
    //     />
    //   </Stack>
    //   <Table
    //     id="portal"
    //     titles={titlesConfig(handleOrderData)}
    //     actions={actions}
    //     entries={confirmInitialtedNormailzeEntries(entries)}
    //     breakpoints={breakPoints}
    //     loading={loading}
    //     filter={searchConfirmInitiated}
    //     widthFirstColumn="55%"
    //   />
    // </Stack>
  );
}

export { ConfirmInitiatedUI };
