import styled from "styled-components";
import { inube } from "@inubekit/foundations";

const StyledModal = styled.div`
  display: flex;
  position: absolute;
  top: 6px;
  right: 8px;
  flex-direction: column;
  background-color: ${inube.palette.neutral.N0};
  width: 155px;
  padding: 12px 16px;
  gap: 48px;
  box-shadow: 0px 0px 3px 1px rgba(0, 0, 0, 0.1);
  z-index: 2;
`;

export { StyledModal };
