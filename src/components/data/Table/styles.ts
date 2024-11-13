import styled from "styled-components";
import { inube } from "@inubekit/foundations";
import { tokens } from "@design/tokens";
import { mediaQueryMobile } from "@config/environment";

interface IStyledTr {
  $smallScreen?: boolean;
  $entriesLength?: number;
  $actionsLength?: number;
  $pageLength?: number;
  $widthFirstColumn?: string;
  $overflow?: boolean;
}

interface IStyledContainer {
  $multipleTables?: boolean;
  $pageLength?: number;
  $entriesLength?: number;
}

interface IStyledTable {
  $smallScreen: boolean;
}

interface IStyledTd {
  $smallScreen?: boolean;
}

interface IStyledThead {
  $smallScreen?: boolean;
  $actionsLength?: number;
}

interface IStyledTdActions {
  $smallScreen?: boolean;
}

interface IStyledThAction {
  $multipleTables?: boolean;
}

const StyledContainer = styled.div<IStyledContainer>`
  border-radius: ${tokens.spacing.s100};
  position: relative;
  border: ${({ $multipleTables }) =>
    $multipleTables === false && `1px solid ${inube.palette.neutral.N40}`};
`;

const StyledContainerTable = styled.div<IStyledContainer>`
  position: relative;
  border-radius: 8px;
  border: ${({ $pageLength, $entriesLength }) =>
    $pageLength &&
    $entriesLength &&
    $entriesLength > $pageLength &&
    `1px solid ${inube.palette.neutral.N40}`};
`;

const StyledTable = styled.table<IStyledTable>`
  box-sizing: border-box;
  border-collapse: collapse;
  table-layout: ${({ $smallScreen }) => ($smallScreen ? "fixed" : "auto")};
  width: 100%;
`;

const StyledThead = styled.thead<IStyledThead>`
  border-bottom: solid 1px
    ${({ theme }) => theme?.palette?.neutral?.N40 || inube.palette.neutral.N40};
  background-color: ${({ theme }) =>
    theme?.palette?.neutral?.N0 || inube.palette.neutral.N0};

  ${({ $actionsLength, $smallScreen, theme }) =>
    $actionsLength &&
    $actionsLength > 0 &&
    `
    td:nth-last-child(${$actionsLength}) {
      border-left: ${$smallScreen ? `1px solid ${theme?.palette?.neutral?.N40 || inube.palette.neutral.N40}` : "none"};
      box-shadow: ${$smallScreen ? "-2px 0px 6px 0px rgba(0, 0, 0, 0.10)" : "none"};
    }

     tr {
    box-shadow: 1px 1px 0px 0px rgba(0, 0, 0, 0.1);
  }

  tr th:nth-child(1) {
    column-span: 3;
  }

  `}
`;

const StyledTbody = styled.tbody`
  background-color: ${({ theme }) =>
    theme?.palette?.neutral?.N0 || inube.palette.neutral.N0};
`;

const StyledTr = styled.tr<IStyledTr>`
  border-bottom: solid 1px
    ${({ theme }) => theme?.palette?.neutral?.N40 || inube.palette.neutral.N40};
  height: 40px;

  td:nth-child(1) {
    width: ${({ $widthFirstColumn }) => $widthFirstColumn};
    box-sizing: ${({ $widthFirstColumn }) => $widthFirstColumn && "border-box"};
  }

  @media (${mediaQueryMobile}) {
    :hover {
      background-color: ${({ theme }) =>
        theme?.palette?.neutral?.N10 || inube.palette.neutral.N10};
      overflow-x: ${({ $overflow }) => $overflow ? "auto" : "none"};
    }
  }

  ${({ $actionsLength, $smallScreen, theme }) =>
    $actionsLength &&
    $actionsLength > 0 &&
    `
    td:nth-last-child(${$actionsLength}) {
      border-left: ${$smallScreen ? `1px solid ${theme?.palette?.neutral?.N40 || inube.palette.neutral.N40}` : "none"};
      box-shadow: ${$smallScreen ? "-2px 0px 6px 0px rgba(0, 0, 0, 0.10)" : "none"};
    }
  
  `}
`;

const StyledThTitle = styled.th`
  padding: ${tokens.spacing.s150} ${tokens.spacing.s200};
`;

const StyledThAction = styled.th<IStyledThAction>`
  background-color: ${({ theme }) =>
    theme?.palette?.neutral?.N0 || inube.palette.neutral.N0};
  padding: ${tokens.spacing.s150} ${tokens.spacing.s200};
  min-width: 70px;

  @media (${mediaQueryMobile}) {
    padding: ${tokens.spacing.s075};
    width: 20px;
  }
`;

const StyledThActionResponsive = styled.th`
  background-color: ${({ theme }) =>
    theme?.palette?.neutral?.N0 || inube.palette.neutral.N0};
  width: 50px;
`;

const StyledTd = styled.td<IStyledTd>`
  padding: ${({ $smallScreen }) =>
    $smallScreen
      ? `${tokens.spacing.s0} ${tokens.spacing.s0} ${tokens.spacing.s0} ${tokens.spacing.s200}`
      : `${tokens.spacing.s0} ${tokens.spacing.s200}`};
  max-width: 300px;
  white-space: nowrap;
  background-color: ${({ theme }) =>
    theme?.palette?.neutral?.N0 || inube.palette.neutral.N0};

  @media (${mediaQueryMobile}) {
    & > p {
      white-space: nowrap;
      text-overflow: clip;
    }
  }
`;

const StyledTdActions = styled.td<IStyledTdActions>`
  background-color: ${({ theme }) =>
    theme?.palette?.neutral?.N0 || inube.palette.neutral.N0};
  text-align: center;
`;

export {
  StyledContainer,
  StyledContainerTable,
  StyledTable,
  StyledThead,
  StyledTbody,
  StyledTr,
  StyledThTitle,
  StyledThAction,
  StyledThActionResponsive,
  StyledTd,
  StyledTdActions,
};
