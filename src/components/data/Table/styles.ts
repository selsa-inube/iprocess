import styled from "styled-components";
import { inube } from "@inubekit/foundations";

interface IStyledTr {
  $smallScreen?: boolean;
  $entriesLength?: number;
  $pageLength?: number;
  $widthFirstColumn?: string;
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
}

interface IStyledTdActions {
  $smallScreen?: boolean;
}

interface IStyledThAction {
  $multipleTables?: boolean;
}

const StyledContainer = styled.div<IStyledContainer>`
  border-radius: 8px;
  border: ${({ $multipleTables}) =>
    $multipleTables === false && `1px solid ${inube.palette.neutral.N40}`};
`;

const StyledContainerTable = styled.div<IStyledContainer>`
  border-radius: 8px;
  border: ${({  $pageLength, $entriesLength }) =>
    $pageLength && $entriesLength && $entriesLength > $pageLength && `1px solid ${inube.palette.neutral.N40}`};

`;

const StyledTable = styled.table<IStyledTable>`
  box-sizing: border-box;
  border-collapse: collapse;
  table-layout: auto;
  width: 100%;
`;

const StyledThead = styled.thead<IStyledThead>`
  border-bottom: solid 1px
    ${({ theme }) => theme?.palette?.neutral?.N40 || inube.palette.neutral.N40};
  background-color: ${({ theme }) =>
    theme?.palette?.neutral?.N0 || inube.palette.neutral.N0};
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

`;

const StyledThTitle = styled.th`
  padding: 12px 16px;
`;

const StyledThAction = styled.th<IStyledThAction>`
  background-color: ${({ theme }) =>
    theme?.palette?.neutral?.N0 || inube.palette.neutral.N0};
  padding: 12px 16px;
  min-width: 70px;
`;

const StyledTd = styled.td<IStyledTd>`
  padding: 0px 16px;
  max-width: 300px;
  white-space: nowrap;
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
  StyledTd,
  StyledTdActions,
};
