import styled, { css } from "styled-components";
import { keyframes } from "styled-components";
import { progressBar } from "@src/components/tokens/progressBar";

interface IStyledProgressBar {
  $height: string;
  $progress: number;
  $appearance:
    | "primary"
    | "success"
    | "warning"
    | "danger"
    | "help"
    | "dark"
    | "gray"
    | "light";
  $animated: boolean;
}

interface IStyledContainerProgressBar {
  $appearance:
    | "primary"
    | "success"
    | "warning"
    | "danger"
    | "help"
    | "dark"
    | "gray"
    | "light";
  $border: boolean;
  $height: string;
}

const Shimmer = keyframes`
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 100% 50%;
  }

`;

const StyledProgressBar = styled.div<IStyledProgressBar>`
  position: relative;
  width: ${({ $progress }) => `${$progress}%`};
  height: ${({ $height }) => $height};
  border-radius: 4px;
  transform-origin: left;
  animation-fill-mode: forwards;
  transition: width 0.3s ease-in-out;
  background-color: ${({ theme, $appearance }) =>
    theme?.progressBar?.[$appearance]?.background.color ||
    progressBar[$appearance]?.background.color};

  ${({ $animated, $appearance }) =>
    $animated &&
    css`
      &::after {
        content: "";
        position: absolute;
        height: 100%;
        width: 100%;
        border-radius: 4px;
        background: ${({ theme }) => `linear-gradient(
      100deg, 
       ${
         theme?.progressBar?.animation?.color ||
         progressBar[$appearance]?.animation.color
       }, ${
         theme?.progressBar?.background?.color ||
         progressBar[$appearance]?.background.color
       }  
    )`};
        background-size: 200% 200%;
        animation: ${Shimmer} 1.5s linear infinite;
      }
    `}
`;

const StyledContainerProgressBar = styled.div<IStyledContainerProgressBar>`
  width: 100%;
  background-color: ${({ theme, $appearance }) => {
    return (
      theme?.progressBar?.[$appearance]?.track.color ||
      progressBar[$appearance]?.track.color
    );
  }};
  border: ${({ $border, $appearance }) =>
    $border && `1px solid ${progressBar[$appearance]?.border.color}`};
  border-radius: 4px;
  height: ${({ $height }) => $height};
`;

export { StyledProgressBar, StyledContainerProgressBar };
