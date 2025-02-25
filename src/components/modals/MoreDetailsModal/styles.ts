import styled from "styled-components";
import { inube } from "@inubekit/inubekit";
import { tokens } from "@design/tokens";

interface IStyledModal {
  $smallScreen: boolean;
}

const StyledContainer = styled.div`
  position: relative;

  div {
    z-index: 1;
  }

  p {
    word-break: keep-all;
    white-space: normal;
  }
`;

const StyledModal = styled.div<IStyledModal>`
  background-color: ${({ theme }) =>
    theme?.palette?.neutral?.N10 || inube.palette.neutral.N10};

  width: ${(props) => (props.$smallScreen ? "280px" : "450px")};

  height: auto;
  border-radius: ${(props) => (props.$smallScreen ? `${tokens.spacing.s200}` : `${tokens.spacing.s100}`)};

  & > div {
    padding: ${(props) => (props.$smallScreen ? `${tokens.spacing.s200}` : `${tokens.spacing.s300}`)};
  }
`;

const StyledModalFields = styled.div<IStyledModal>`
  display: flex;
  gap: ${tokens.spacing.s050};
  flex-direction: column;
  hyphens: auto;

  & > fieldset {
    padding: ${tokens.spacing.s150};
  }

  & > fieldset div:nth-child(1) {
    padding: ${tokens.spacing.s100} ${tokens.spacing.s0};
  }
 
  & > div {
    min-height:${tokens.spacing.s0} !important;
    margin-bottom: -8px !important;
  }

  @media screen and (max-width: 500px) {
    div {
      max-width: 200px;
    }
  }
`;

export { StyledContainer, StyledModal, StyledModalFields };
