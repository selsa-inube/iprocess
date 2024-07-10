import { inube } from "@inubekit/foundations";
import styled from "styled-components";

const StyledModal = styled.div`
  display: flex;
  min-width: 480px;
  padding: 24px;
  flex-direction: column;
  gap: 20px;
  border-radius: 16px;
  background-color: ${({ theme }) =>
    theme?.palette?.neutral?.N10 || inube.palette.neutral.N10};
`;

const StyledContainerTables = styled.div`
  border: 1px solid
    ${({ theme }) => theme?.palette?.neutral?.N40 || inube.palette.neutral.N40};
  border-radius: 8px;
`;

export { StyledModal, StyledContainerTables };
