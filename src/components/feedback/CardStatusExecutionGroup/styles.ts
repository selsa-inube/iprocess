import styled from "styled-components";
import { tokens } from "@design/tokens";

const StyledCardStatusGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  gap: ${tokens.spacing.s150};
  margin: ${tokens.spacing.s0};
  padding: ${tokens.spacing.s0};
  height:370px;
  overflow-y: auto;
  scrollbar-width: thin;
`;

export { StyledCardStatusGroup };
