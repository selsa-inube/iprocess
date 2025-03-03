import styled from "styled-components";
import { tokens } from "@design/tokens";
import { inube } from "@inubekit/inubekit";

export const StyledContainer = styled.div`
  display: flex;
  padding: ${tokens.spacing.s150} ${tokens.spacing.s100};
  flex-direction: column;
  gap: ${tokens.spacing.s100};
  border-radius: ${tokens.spacing.s100};
  box-sizing: border-box;
  align-items: stretch;
  width: 100%;
  max-height: 385px;
  border: 1px solid
    ${({ theme }) =>
      theme.color?.stroke?.gray?.regular || inube.palette.neutral.N40};
`;

export const StyledHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  cursor: pointer;
`;
