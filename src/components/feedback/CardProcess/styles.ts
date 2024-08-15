import styled from "styled-components";
import { inube } from "@inubekit/foundations";
import { tokens } from "@src/design/tokens";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 254px;
  min-height: 148px;
  padding: ${tokens.spacing.s150};
  gap: ${tokens.spacing.s150};
  border-radius: ${tokens.spacing.s100};
  border: 1px solid ${inube.palette.neutralAlpha.N40A};
  background-color: ${({ theme }) =>
    theme?.palette.neutral.N0 || inube.palette.neutral.N0};
  box-shadow: 0px 2px 5px 1px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;

  & > div:nth-child(1) p:nth-child(1) {
    word-break: break-all;
    white-space: normal;
  }
`;

const StyledStatus = styled.div`
  cursor: pointer;
`;

const StyledAction = styled.div`
  display: flex;
  align-items: end;
  background-color: ${({ theme }) =>
    theme?.palette?.neutral?.N0 || inube.palette.neutral.N0};
`;

export { StyledContainer, StyledStatus, StyledAction };
