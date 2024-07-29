import { AnimationEvent } from "react";

import { tokens } from "@src/design/tokens";
import { StyledContainerProgressBar, StyledProgressBar } from "./styles";
import { ProgressBarAppearanceType } from "./types";


interface ProgressBarProps {
  progress: number;
  height?: string;
  appearance?: ProgressBarAppearanceType;
  withBorder?: boolean;
  withAnimated?: boolean;
  onProgress?: (e: AnimationEvent<HTMLDivElement>) => void;
}

const ProgressBar = (props: ProgressBarProps) => {
  const {
    progress,
    appearance = "primary",
    height = tokens.spacing.s050,
    withAnimated = false,
    withBorder = true,
    onProgress,
  } = props;

  const interceptOnProgress = (e: AnimationEvent<HTMLDivElement>) => {
    try {
      onProgress && onProgress(e);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("An unknown error occurred");
      }
    }
  };

  return (
    <StyledContainerProgressBar
      $withBorder={withBorder}
      $appearance={appearance}
      $height={height}
    >
      <StyledProgressBar
        id="progress-bar"
        $appearance={appearance}
        $height={height}
        $progress={progress}
        $withAnimated={withAnimated}
        onAnimationEnd={interceptOnProgress}
      />
    </StyledContainerProgressBar>
  );
};

export { ProgressBar };
export type { ProgressBarProps };
