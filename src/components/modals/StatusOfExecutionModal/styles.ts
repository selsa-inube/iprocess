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

  width: ${(props) => (props.$smallScreen ? "340px" : "996px")};
  height: auto;
  border-radius: ${(props) =>
    props.$smallScreen ? `${tokens.spacing.s150}` : `${tokens.spacing.s100}`};

  & > div {
    padding: ${(props) =>
      props.$smallScreen ? `${tokens.spacing.s200}` : `${tokens.spacing.s200} ${tokens.spacing.s300} ${tokens.spacing.s075}`};
  }
`;

const StyledFields = styled.div`
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
      max-width: 300px;
    }
  }
`;
export { StyledContainer, StyledModal, StyledFields };
