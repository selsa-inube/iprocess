import styled from "styled-components";
import { inube } from "@inubekit/foundations";
import { tokens } from "@src/design/tokens";

interface IStyledModal {
  $withSmallScreen: boolean;
}

const StyledContainer = styled.div`
  position: relative;
`;

const StyledModal = styled.div<IStyledModal>`
  background-color: ${({ theme }) =>
    theme?.palette?.neutral?.N10 || inube.palette.neutral.N10};

  width: ${(props) => (props.$withSmallScreen ? "280px" : "402px")};
  min-height: auto;
  border-radius: ${(props) => (props.$withSmallScreen ? tokens.spacing.s0 : tokens.spacing.s100)};
  gap: ${tokens.spacing.s250};
  & > div {
    padding: ${(props) => (props.$withSmallScreen ? tokens.spacing.s200 : tokens.spacing.s300)};
  }
`;

export { StyledContainer, StyledModal };
