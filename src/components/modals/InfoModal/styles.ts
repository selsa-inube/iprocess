import styled from "styled-components";
import { inube } from "@inubekit/inubekit";
import { tokens } from "@design/tokens";

const StyledModal = styled.div`
  display: flex;
  position: absolute;
  top: 6px;
  right: 6px;
  flex-direction: column;
  background-color: ${inube.palette.neutral.N0};
  width: 155px;
  padding: ${tokens.spacing.s150} ${tokens.spacing.s200};
  gap: ${tokens.spacing.s600};
  box-shadow: 0px 0px 3px 1px rgba(0, 0, 0, 0.1);
  z-index: 3;
`;

export { StyledModal };
