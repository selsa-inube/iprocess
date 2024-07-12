import styled from "styled-components";
import { inube } from "@inubekit/foundations";

interface IStyledModal {
  $smallScreen: boolean;
}

const StyledContainer = styled.div`
  position: relative;

  div {
    z-index: 1;
  }

 
`;

const StyledModal = styled.div<IStyledModal>`
  background-color: ${({ theme }) =>
    theme?.palette?.neutral?.N10 || inube.palette.neutral.N10};

  width: ${(props) => (props.$smallScreen ? "280px" : "450px")};
  min-height: ${(props) => (props.$smallScreen ? "100vh" : "auto")};
  height: auto;
  border-radius: ${(props) => (props.$smallScreen ? "0" : "8px")};

  & > div {
    padding: ${(props) => (props.$smallScreen ? "16px" : "24px")};
  }
`;

const StyledModalFields = styled.div<IStyledModal>`
  display: flex;
  gap: 4px;
  flex-direction: column;
  hyphens: auto;

  div {
    min-height: 0px !important;
    margin-bottom: -8px !important;
  }

  p {
    word-break: break-all;
    white-space: normal;
  }

  @media screen and (max-width: 500px) {
    div {
      max-width: 200px;
    }
  }
`;

const StyledTextarea = styled.div`
  @media (max-width: 490px) {
    div {
      display: inline;
    }

    div:nth-child(2) p {
      text-align: right;
    }

    p {
      white-space: normal;

      margin: 0px;
    }
  }
`;

export { StyledContainer, StyledModal, StyledModalFields, StyledTextarea };
