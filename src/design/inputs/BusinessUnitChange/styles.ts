import styled from "styled-components";
import { inube } from "@inubekit/foundations";
import { tokens } from "@design/tokens";

export const StyledContainer = styled.div`
  box-shadow: 2px 2px 3px 2px
    ${({ theme }) => theme?.palette?.neutral?.N30 || inube.palette.neutral.N30};
  border-radius: ${tokens.spacing.s100};
  background-color: ${({ theme }) =>
    theme?.palette?.neutral?.N0 || inube.palette.neutral.N0};
  margin-left: 10px;
  margin-top: 70px;
  z-index: 3;
`;

export const StyledUl = styled.ul`
  display: flex;
  flex-direction: column;
  width: 170px;
  margin: ${tokens.spacing.s0};
  padding-left: ${tokens.spacing.s150};
`;

export const StyledLi = styled.li`
  list-style: none;
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
`;

export const StyledImg = styled.img`
  position: relative;
  width: 80px;
  height: auto;
  left: 5px;
  padding: ${tokens.spacing.s150} ${tokens.spacing.s150} ${tokens.spacing.s150} ${tokens.spacing.s100};
  object-fit: contain;
`;

export const StyledHr = styled.hr`
  position: absolute;
  width: 80%;
  border-top: 2px solid;
  border-color: ${({ theme }) =>
    theme?.palette?.neutral?.N40 || inube.palette.neutral.N40};
  margin: ${tokens.spacing.s0};
`;
