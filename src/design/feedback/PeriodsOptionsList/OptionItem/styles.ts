import styled from "styled-components";

import { tokens } from "@design/tokens";

interface StyledContainerProps {
  $isSelected: boolean;
}

const StyledContainer = styled.li<StyledContainerProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: stretch;
  height: 40px;
  border-left: ${tokens.spacing.s050} solid transparent;
  padding: ${tokens.spacing.s050} ${tokens.spacing.s200} ${tokens.spacing.s050} ${tokens.spacing.s150};
  cursor: pointer;
  box-sizing: border-box;
  border-left-width: ${tokens.spacing.s050};
  border-left-style: solid;
  background-color: ${({ theme, $isSelected }) =>
    $isSelected
      ? theme?.optionsPeriod?.background?.color?.selected
      : theme?.optionsPeriod?.background?.color?.regular};
  border-left-color: ${({ theme, $isSelected }) =>
    $isSelected
      ? theme?.optionsPeriod?.border?.color?.focus
      : theme?.optionsPeriod?.border?.color?.regular};

  & > p {
    color: ${({ theme }) => theme?.optionsPeriod?.content?.color?.regular};
  }

  &:hover {
    border-left-color: ${({ theme }) =>
      theme?.optionsPeriod?.border?.color?.focus};

    background-color: ${({ theme }) =>
      theme?.optionsPeriod?.background?.color?.regular};

    & > p {
      color: ${({ theme }) => theme?.optionsPeriod?.content?.color?.regular};
    }
  }
`;

export { StyledContainer };
