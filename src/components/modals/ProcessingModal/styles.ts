import styled from "styled-components";
import { inube } from "@inubekit/inubekit";

interface IStyledModal {
  $smallScreen: boolean;
}

const StyledContainer = styled.div`
  position: relative;
`;

const StyledModal = styled.div<IStyledModal>`
  background-color: ${({ theme }) =>
    theme?.palette?.neutral?.N10 || inube.palette.neutral.N10};

  width: ${(props) => (props.$smallScreen ? "280px" : "402px")};
  height: auto;
  border-radius: ${(props) => (props.$smallScreen ? "0" : "8px")};
  gap: 20px;
  & > div {
    padding: ${(props) => (props.$smallScreen ? "16px" : "24px")};
  }
`;

export { StyledContainer, StyledModal };
