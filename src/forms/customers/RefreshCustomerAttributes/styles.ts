import styled from "styled-components";
import { mediaQueryMobile } from "@config/environment";
import { tokens } from "@design/tokens";

interface IStyledField {
  $smallScreen?: boolean;
}

const StyledField = styled.div<IStyledField>`
  display: flex;
  gap: ${tokens.spacing.s050};
  flex-direction: column;
  hyphens: auto;

  & > fieldset {
    padding: ${tokens.spacing.s150};
  }

  & > fieldset div:nth-child(1) {
    padding: ${tokens.spacing.s100} ${tokens.spacing.s0};
    background-color: red;
  }
 
  & > div {
    min-height:${tokens.spacing.s0} !important;
    margin-bottom: -8px !important;
  }

  p:first-child{
    padding-left: ${tokens.spacing.s200};
  }

   p:last-child{
    word-break: keep-all;
    white-space: normal;
    padding-left: ${tokens.spacing.s0};
  }

  @media screen and (${mediaQueryMobile}) {
    div {
      max-width: 200px;
    }
  }
`;

const StyledTextarea = styled.div`
  @media (${mediaQueryMobile}) {
    div {
      display: inline;
    }

    div:nth-child(2) p {
      text-align: right;
    }

    p {
      white-space: normal;
      margin: ${tokens.spacing.s0};
    }
  }
`;

export { StyledField, StyledTextarea };
