import styled from "styled-components";
import { inube } from "@inubekit/inubekit";
import { tokens } from "@design/tokens";


const StyledContainer = styled.div`
   position: relative;
   display: inline-block;
`;

const StyledIcon = styled.div``;

const StyledText = styled.div`
  min-width: 185px;
  background-color: ${inube.palette.neutralAlpha.N900A};
  color: ${inube.palette.neutral.N10};
  text-align: center;
  border-radius: ${tokens.spacing.s050};
  padding: ${tokens.spacing.s100};
  position: absolute;
  z-index: 1;
  opacity: 70%;

  & > p {
    text-align: center;
    word-break: keep-all;
    white-space: normal;
  }


`;

export { StyledContainer, StyledIcon, StyledText };
