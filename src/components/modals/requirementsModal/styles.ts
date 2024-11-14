import { inube } from "@inubekit/foundations";
import styled from "styled-components";

interface IStyledModal {
  $smallScreen: boolean;
}

const StyledModal = styled.div<IStyledModal>`
  display: flex;
  min-width: ${(props) => (props.$smallScreen ? "300px" : "480px")};
  max-width:  ${(props) => (props.$smallScreen ? "300px" : "950px")};
  max-height: ${(props) => (props.$smallScreen ? "500px" : "700px")};
  padding: 24px;
  flex-direction: column;
  gap: 20px;
  border-radius: 16px;
  background-color: ${({ theme }) =>
    theme?.palette?.neutral?.N10 || inube.palette.neutral.N10};
`;

const StyledContainerTables = styled.div<IStyledModal>`
min-height: ${(props) => (props.$smallScreen && "125px")};
border: 1px solid
    ${({ theme }) => theme?.palette?.neutral?.N40 || inube.palette.neutral.N40};
  border-radius: 8px;
  height: 100%;
   overflow-y: auto; 
`;

export { StyledModal, StyledContainerTables };
