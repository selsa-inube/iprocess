import { useMemo, useState } from "react";
import { Stack } from "@inubekit/stack";
import { Pagination } from "./Pagination";
import { TableUI } from "./interface";
import { StyledContainer } from "./styles";
import { IAction, IActions, IBreakpoint, ITitle } from "./props";

interface ITable {
  actions: IAction[];
  entries: IActions[];
  id: string;
  loading: boolean;
  titles: ITitle[];
  widthFirstColumn?: string;
  breakpoints?: IBreakpoint[];
  filter?: string;
  infoTitle?: string;
  pageLength?: number;
}

const Table = (props: ITable) => {
  const {
    id,
    titles,
    actions,
    entries,
    filter = "",
    loading,
    widthFirstColumn,
    pageLength = 30,
    breakpoints,
    infoTitle,
  } = props;

  const filteredEntries = useMemo(() => {
    const titlesId = titles.map((title) => title.id);

    return entries.filter((entry) => {
      for (const attribute in entry) {
        if (
          titlesId.includes(attribute) &&
          entry[attribute]
            .toString()
            .toLowerCase()
            .includes(filter.toLowerCase())
        ) {
          return true;
        }
      }
      return false;
    });
  }, [entries, filter, titles]);

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(filteredEntries.length / pageLength);

  const firstEntryInPage = (currentPage - 1) * pageLength;

  const lastEntryInPage = Math.min(
    firstEntryInPage + pageLength,
    filteredEntries.length
  );

  function getPageEntries() {
    return filteredEntries.slice(firstEntryInPage, lastEntryInPage);
  }

  function goToFirstPage() {
    setCurrentPage(1);
  }

  function goToEndPage() {
    setCurrentPage(totalPages);
  }

  function nextPage() {
    if (currentPage !== totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }

  function prevPage() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  return (
    <StyledContainer id={id}>
      <Stack direction="column">
        <TableUI
          titles={titles}
          actions={actions}
          entries={getPageEntries()}
          loading={loading}
          widthFirstColumn={widthFirstColumn}
          breakpoints={breakpoints!}
          infoTitle={infoTitle!}
          pageLength={pageLength}
        />
        {filteredEntries.length > pageLength && (
          <Pagination
            firstEntryInPage={firstEntryInPage}
            lastEntryInPage={lastEntryInPage}
            totalRecords={filteredEntries.length}
            handleStartPage={goToFirstPage}
            handlePrevPage={prevPage}
            handleNextPage={nextPage}
            handleEndPage={goToEndPage}
          />
        )}
      </Stack>
    </StyledContainer>
  );
};

export { Table };
export type { ITable };
