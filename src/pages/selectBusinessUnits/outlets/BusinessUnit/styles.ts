import styled from "styled-components";
import { tokens } from "@design/tokens";

interface StyledBusinessUnitsListProps {
  $scroll?: boolean;
}

const StyledBusinessUnits = styled.div`
  & form {
    & > div {
      margin: ${tokens.spacing.s600} auto ${tokens.spacing.s0};
      width: 500px;
      @media screen and (max-width: 532px) {
        width: auto;
      }
    }
  }

  & button {
    margin-top: ${tokens.spacing.s300};
  }
`;

const StyledBusinessUnitsList = styled.div<StyledBusinessUnitsListProps>`
  & > div {
    list-style: none;
    min-height: 300px;
    max-height: 430px;
    width: inherit;
    overflow-y: ${({ $scroll }) => ($scroll ? "scroll" : "visible")};
    @media screen and (max-height: 1000px) {
      min-height: 200px;
    }
  }
`;

const StyledNoResults = styled.div`
  margin: ${tokens.spacing.s200} ${tokens.spacing.s0};
`;

const StyledBusinessUnitsItem = styled.li`
  width: 100%;
`;

export {
  StyledBusinessUnits,
  StyledBusinessUnitsList,
  StyledNoResults,
  StyledBusinessUnitsItem,
};
