import styled from "styled-components";
import { inube } from "@inubekit/foundations";
import { tokens } from "@design/tokens";

interface IStyledModal {
  $smallScreen: boolean;
}

const StyledContainer = styled.div`
  position: relative;
`;

const StyledModal = styled.div<IStyledModal>`
  background-color: ${({ theme }) =>
    theme?.palette?.neutral?.N10 || inube.palette.neutral.N10};

  width: ${(props) => (props.$smallScreen ? "480px" : "996px")};
  min-height: ${(props) => (props.$smallScreen ? "100vh" : "auto")};
  height: auto;
  border-radius: ${(props) =>
    props.$smallScreen ? `${tokens.spacing.s0}` : `${tokens.spacing.s100}`};

  & > div {
    padding: ${(props) =>
      props.$smallScreen ? `${tokens.spacing.s200}` : `${tokens.spacing.s300}`};
  }
`;

const StyledFields = styled.div<IStyledModal>`
  display: flex;
  gap: ${tokens.spacing.s050};
  flex-direction: column;
  hyphens: auto;

  & > fieldset {
    padding: ${tokens.spacing.s150};
  }

  & > fieldset div:nth-child(1) {
    padding: ${tokens.spacing.s100} ${tokens.spacing.s0};
    background-color: red;
  }

  & > div {
    min-height: ${tokens.spacing.s0} !important;
    margin-bottom: -8px !important;
  }

  div {
    min-height: ${tokens.spacing.s0}!important;
    margin-bottom: -8px !important;
  }

  @media screen and (max-width: 500px) {
    div {
      max-width: 200px;
    }
  }
`;
export { StyledContainer, StyledModal, StyledFields };
