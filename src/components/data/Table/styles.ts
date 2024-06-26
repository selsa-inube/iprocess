import styled from "styled-components";
import { inube } from "@inubekit/foundations";

interface IStyledTr {
  $smallScreen?: boolean;
  $entriesLength?: number;
  $pageLength?: number | undefined;
  $widthFirstColumn?: string | undefined;
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

const StyledContainer = styled.div`
  border-radius: 8px;
  border: 1px solid ${inube.palette.neutral.N40};
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
  }

  &:last-child {
    border-bottom: ${({ $entriesLength, $pageLength }) =>
      $pageLength && $entriesLength && $entriesLength < $pageLength && "none"};
  }
`;

const StyledThTitle = styled.th`
  padding: 12px 16px;
`;

const StyledThAction = styled.th`
  background-color: ${({ theme }) =>
    theme?.palette?.neutral?.N30 || inube.palette.neutral.N30};
  width: 80px;
  padding: 12px 16px;
`;

const StyledTd = styled.td<IStyledTd>`
  padding: 0px 16px;
  text-align: center;
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
  StyledTable,
  StyledThead,
  StyledTbody,
  StyledTr,
  StyledThTitle,
  StyledThAction,
  StyledTd,
  StyledTdActions,
};
