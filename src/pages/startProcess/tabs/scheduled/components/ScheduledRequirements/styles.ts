import styled from "styled-components";

interface IStyledContainer {
    $withCursor: boolean;
}

const StyledContainer = styled.div<IStyledContainer>`
cursor:${({  $withCursor }) =>
   $withCursor && "pointer" }; 
`;

const StyledContainerIcon = styled.div<IStyledContainer>`
cursor:${({  $withCursor }) =>
   $withCursor && "pointer" }; 
`;

export { StyledContainer, StyledContainerIcon };
