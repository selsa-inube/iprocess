import styled from "styled-components";
import { inube } from "@inubekit/foundations";

import { tokens } from "@design/tokens";

interface IStyledContainerProgressBar {
  $height: string;
}

const StyledContainerProgressBar = styled.div<IStyledContainerProgressBar>`
  width: 95%;
  border: 1px solid ${inube.palette.neutral.N40};
  border-radius: ${tokens.spacing.s050};
  height: ${({ $height }) => $height};
`;

export { StyledContainerProgressBar };