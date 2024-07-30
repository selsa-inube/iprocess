import styled, { css } from "styled-components";
import { keyframes } from "styled-components";

import { tokens } from "@src/design/tokens";

import { ProgressBarAppearanceType } from "./types";

interface IStyledProgressBar {
  $height: string;
  $progress: number;
  $appearance: ProgressBarAppearanceType;
  $withAnimated: boolean;
}

interface IStyledContainerProgressBar {
  $appearance: ProgressBarAppearanceType;
  $withBorder: boolean;
  $height: string;
}

const shimmer = keyframes`
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
  border-radius: ${tokens.spacing.s050};
  transform-origin: left;
  animation-fill-mode: forwards;
  transition: width 0.3s ease-in-out;
  background-color: ${({ theme, $appearance }) =>
    theme.progressBar?.[$appearance]?.background.color};

  ${({ $withAnimated, $progress, $appearance }) =>
    $withAnimated &&
    $progress !== 100 &&
    css`
      &::after {
        content: "";
        position: absolute;
        height: 100%;
        width: 100%;
        border-radius: ${tokens.spacing.s050};
        background: ${({ theme }) => `linear-gradient(
      100deg, 
       ${
         theme?.progressBar?.[$appearance]?.animation.color 
       }, ${
         theme?.progressBar?.[$appearance]?.background.color 
       }  
    )`};
        background-size: 200% 200%;
        animation: ${shimmer} 1.3s linear infinite;
      }
    `}
`;

const StyledContainerProgressBar = styled.div<IStyledContainerProgressBar>`
  width: 100%;
  background-color: ${({ theme, $appearance }) => {
    return theme?.progressBar?.[$appearance]?.track.color;
  }};
  border: ${({ $withBorder, $appearance, theme }) =>
    $withBorder && `1px solid ${theme?.progressBar?.[$appearance]?.border.color}`};
  border-radius: ${tokens.spacing.s050};
  height: ${({ $height }) => $height};
`;

export { StyledProgressBar, StyledContainerProgressBar };
