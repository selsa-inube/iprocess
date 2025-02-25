import styled from "styled-components";
import { inube } from "@inubekit/inubekit";
import { tokens } from "@design/tokens";
import { ProgressCardWithBarType } from "./types";

interface IStyledModal {
  $withSmallScreen: boolean;
}

interface IStyledContainerProgressBar {
  $appearance: ProgressCardWithBarType;
  $height: string;
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

const StyledContainerProgressBar = styled.div<IStyledContainerProgressBar>`
  width: 100%;
  background-color: ${({ theme, $appearance }) => {
    return theme?.progressBar?.[$appearance]?.track.color;
  }};
  border: 1px solid ${inube.palette.neutral.N40};
  border-radius: ${tokens.spacing.s050};
  height: ${({ $height }) => $height};
`;

export { StyledContainer, StyledModal, StyledContainerProgressBar };
