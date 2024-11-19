import styled from "styled-components";
import { inube } from "@inubekit/foundations";

const StyledRadioBusinessUnit = styled.label`
  & div {
    box-sizing: border-box;
    max-height: 58px;
    box-shadow: 1px 2px 2px 1px
      ${({ theme }) =>
        theme?.color?.surface?.gray?.regular || inube.palette.neutral.N30};
    border: 1px solid
      ${({ theme }) =>
        theme?.color?.surface?.gray?.regular || inube.palette.neutral.N30};
    cursor: pointer;
  }
`;

const StyledRadio = styled.input`
  width: 16px;
  height: 16px;
  &:checked ~ img {
    filter: grayscale(0%);
  }
`;

const StyledImage = styled.img`
  width: 100px;
  height: auto;
  transition: filter 500ms ease-out;
  filter: grayscale(100%);

  @media screen and (max-width: 532px) {
    display: none;
  }
`;

export { StyledRadioBusinessUnit, StyledImage, StyledRadio };
