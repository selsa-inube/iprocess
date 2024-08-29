import { useMemo } from "react";
import { Text } from "@inubekit/text";
import { useMediaQuery } from "@inubekit/hooks";
import { useMediaQueries } from "@inubekit/hooks";
import { SkeletonLine } from "@inubekit/skeleton";

import {
  StyledTable,
  StyledThead,
  StyledTbody,
  StyledTr,
  StyledThAction,
  StyledThTitle,
  StyledTd,
  StyledTdActions,
  StyledContainer,
} from "./styles";
import { IAction, IActions, IBreakpoint, ITitle, ITypeTitle } from "./props";
import { ITable } from ".";

const actionsLoading = (numberActions: number) => {
  const cellsOfActionsLoading = [];
  for (let cellAction = 0; cellAction < numberActions; cellAction++) {
    cellsOfActionsLoading.push(
      <StyledTd key={cellAction}>
        <SkeletonLine animated />
      </StyledTd>
    );
  }
  return cellsOfActionsLoading;
};

const dataLoading = (titleColumns: ITitle[], numberActions: number) => {
  const rowsLoading = [];
  for (let rows = 0; rows < 4; rows++) {
    rowsLoading.push(
      <StyledTr key={rows}>
        {titleColumns.map((title) => (
          <StyledTd key={`e-${title.id}`}>
            <SkeletonLine animated />
          </StyledTd>
        ))}
        {actionsLoading(numberActions)}
      </StyledTr>
    );
  }
  return rowsLoading;
};

function findCurrentMediaQuery(currentMediaQuery: { [key: string]: boolean }) {
  const lastIndexMedia = Object.values(currentMediaQuery).lastIndexOf(true);
  return lastIndexMedia !== -1 ? lastIndexMedia : 0;
}

function priorityColumns(titles: ITitle[], numColumns: number) {
  const maxPriorityToDisplay = numColumns - 1;
  return titles.filter((title) => title.priority <= maxPriorityToDisplay);
}

function totalTitleColumns(
  titles: ITitle[],
  breakpoints: IBreakpoint[],
  media: Record<string, boolean>
) {
  const numColumns = breakpoints[findCurrentMediaQuery(media)].totalColumns;

  if (numColumns >= titles.length) return titles;

  return priorityColumns(titles, numColumns);
}

function showActionTitle(
  actionTitle: IAction[],
  mediaQuery: boolean,
  multipleTables: boolean,
  typeTitle: ITypeTitle
) {
  return !mediaQuery ? (
    actionTitle.map((action) => (
      <StyledThAction
        key={`action-${action.id}`}
        $multipleTables={multipleTables}
      >
        <Text
          type={typeTitle}
          size="small"
          textAlign="center"
          appearance="dark"
          weight="bold"
        >
          {action.actionName}
        </Text>
      </StyledThAction>
    ))
  ) : (
    <StyledThAction $multipleTables={multipleTables}></StyledThAction>
  );
}

function ShowAction(actionContent: IAction[], entry: IActions) {
  return (
    <>
      {actionContent.map((action) => (
        <StyledTdActions key={`${entry.id}-${action.id}`}>
          {action.content(entry)}
        </StyledTdActions>
      ))}
    </>
  );
}

const TableUI = (props: Omit<ITable, "id">) => {
  const {
    actions,
    entries,
    breakpoints,
    isLoading,
    pageLength,
    titles,
    typeTitle,
    widthFirstColumn,
    multipleTables = false,
  } = props;

  const mediaActionOpen = useMediaQuery("(max-width: 1120px)");

  const queriesArray = useMemo(
    () => breakpoints && breakpoints.map((breakpoint) => breakpoint.breakpoint),
    [breakpoints]
  );

  const media = useMediaQueries(queriesArray || []);

  const TitleColumns = useMemo(
    () => totalTitleColumns(titles, breakpoints!, media),
    [titles, breakpoints, media]
  );

  const numberActions = actions ? actions.length : 0;

  return (
    <StyledContainer $multipleTables={multipleTables}>
      <StyledTable $smallScreen={mediaActionOpen}>
        <StyledThead $smallScreen={mediaActionOpen}>
          <StyledTr>
            {TitleColumns.map((title) => (
              <StyledThTitle key={`title-${title.id}`}>
                {typeof title.titleName !== "string" ? (
                  title.titleName
                ) : (
                  <Text
                    type={typeTitle}
                    size="small"
                    appearance="dark"
                    textAlign="start"
                    weight="bold"
                  >
                    {title.titleName}
                  </Text>
                )}
              </StyledThTitle>
            ))}
            {actions &&
              showActionTitle(
                actions,
                mediaActionOpen,
                multipleTables,
                typeTitle
              )}
          </StyledTr>
        </StyledThead>
        <StyledTbody>
          {isLoading ? (
            dataLoading(TitleColumns, numberActions)
          ) : (
            <>
              {entries.length > 0 ? (
                entries.map((entry) => (
                  <StyledTr
                    key={`entry-${entry.id}`}
                    aria-labelledby={`entry-${entry.id}`}
                    $smallScreen={mediaActionOpen}
                    $pageLength={pageLength}
                    $entriesLength={entries.length}
                    $widthFirstColumn={widthFirstColumn}
                  >
                    {TitleColumns.map((title) => (
                      <StyledTd
                        key={`e-${entry[title.id]}`}
                        $smallScreen={mediaActionOpen}
                      >
                        {typeof entry[title.id] !== "string" ? (
                          entry[title.id]
                        ) : (
                          <Text
                            type="body"
                            size="small"
                            appearance="dark"
                            textAlign="start"
                            ellipsis
                          >
                            {entry[title.id]}
                          </Text>
                        )}
                      </StyledTd>
                    ))}
                    {actions && ShowAction(actions, entry)}
                  </StyledTr>
                ))
              ) : (
                <StyledTr aria-labelledby={`no-data`}>
                  <StyledTd>
                    <Text type="body" size="small" appearance="dark" ellipsis>
                      No se encontró información
                    </Text>
                  </StyledTd>
                </StyledTr>
              )}
            </>
          )}
        </StyledTbody>
      </StyledTable>
    </StyledContainer>
  );
};

export { TableUI };
