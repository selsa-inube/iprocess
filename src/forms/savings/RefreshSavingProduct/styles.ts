import { tokens } from "@src/design/tokens";
import styled from "styled-components";
interface IStyledField {
  $smallScreen?: boolean;
}

const StyledField = styled.div<IStyledField>`
  display: flex;
  gap: ${tokens.spacing.s050};
  flex-direction: column;
  hyphens: auto;

  div {
    min-height: 0px !important;
    margin-bottom: -8px !important;
  }
  p:first-child{
    padding-left: ${tokens.spacing.s200};
  }

   p:last-child{
    word-break: break-all;
    white-space: normal;
    padding-left: ${tokens.spacing.s0};
  }

  @media screen and (max-width: 500px) {
    div {
      max-width: 200px;
    }
  }
`;

const StyledContentSelect  = styled.div`
  label {
    padding-left: 16px;
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

export { StyledField, StyledTextarea, StyledContentSelect };
