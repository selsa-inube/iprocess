import styled from "styled-components";

interface IStyledOptionlist {
  $numberOptions: number;
  $ref?: React.ForwardedRef<unknown>;
}

const StyledOptionlist = styled.div<IStyledOptionlist>`
  cursor: pointer;
  position: relative;
  bottom: ${({ $numberOptions }) => ($numberOptions > 5 ? "160px" : "80px")}; 
  right: 40px;

  @media (max-width: 520px) {
 left: -150px;
 bottom: 0px;    
  }
`;

export { StyledOptionlist };
