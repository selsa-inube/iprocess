import {
  MdNavigateBefore,
  MdNavigateNext,
  MdFirstPage,
  MdLastPage,
} from "react-icons/md";

import { Text } from "@inubekit/text";
import { Icon } from "@inubekit/icon";
import { Stack } from "@inubekit/stack";

interface IPagination {
  firstEntryInPage: number;
  lastEntryInPage: number;
  totalRecords: number;
  handleStartPage: () => void;
  handlePrevPage: () => void;
  handleNextPage: () => void;
  handleEndPage: () => void;
}

const Pagination = (props: IPagination) => {
  const {
    firstEntryInPage,
    lastEntryInPage,
    totalRecords,
    handleStartPage,
    handlePrevPage,
    handleNextPage,
    handleEndPage,
  } = props;

  return (
    <Stack justifyContent="flex-end" alignItems="center">
      <Text
        type="body"
        size="small"
        padding="16px 0px"
        appearance="dark"
        textAlign="start"
      >
        {firstEntryInPage + 1} - {lastEntryInPage} of {totalRecords}
      </Text>

      <Stack
        alignItems="center"
        padding="s0 s300"
        margin="s0 s0 s0 s200"
        gap="8px"
      >
        <Icon
          cursorHover={true}
          appearance={"dark"}
          icon={<MdFirstPage />}
          onClick={handleStartPage}
        />
        <Icon
          cursorHover={true}
          appearance={"dark"}
          icon={<MdNavigateBefore />}
          onClick={handlePrevPage}
        />
        <Icon
          cursorHover={true}
          appearance={"dark"}
          icon={<MdNavigateNext />}
          onClick={handleNextPage}
        />
        <Icon
          cursorHover={true}
          appearance={"dark"}
          icon={<MdLastPage />}
          onClick={handleEndPage}
        />
      </Stack>
    </Stack>
  );
};

export { Pagination };
export type { IPagination };
