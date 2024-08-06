import styled from "styled-components";

interface IStyledOptionlist {
  $numberOptions: number;
  $ref?: React.ForwardedRef<unknown>;
}

const StyledOptionlist = styled.div<IStyledOptionlist>`
  cursor: pointer;
  position: relative;
  bottom: ${({ $numberOptions }) => ($numberOptions === 5 ? "120px" : "80px")};
  right: 40px;
`;

export { StyledOptionlist };
