import styled from "styled-components";

import { tokens } from "@design/tokens";

interface IStyledContainer {
  $onClick?: (e: PointerEvent) => void;
}

const StyledContainer = styled.ul<IStyledContainer>`
  display: flex;
  flex-direction: column;
  padding: ${tokens.spacing.s050} ${tokens.spacing.s0};
  position: absolute;
  z-index: 2;
  border-radius: ${tokens.spacing.s050};

  background: ${({ theme }) => {
    return theme?.optionsPeriod?.optionList?.background?.expanded;
  }};
  box-shadow:
    0px 1px 2px rgba(0, 0, 0, 0.3),
    0px 2px 6px 2px rgba(0, 0, 0, 0.15);
  & > li:hover {
    background: ${({ theme }) => {
      return theme?.optionsPeriod?.optionList?.background?.selected;
    }};
  }
`;

export { StyledContainer };
