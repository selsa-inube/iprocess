import { AnimationEvent } from "react";
import { StyledContainerProgressBar, StyledProgressBar } from "./styles";

interface ProgressBarProps {
  progress: number;
  height?: string;
  appearance?:
    | "primary"
    | "success"
    | "warning"
    | "danger"
    | "help"
    | "dark"
    | "gray"
    | "light";

  border?: boolean;
  animated?: boolean;
  onProgress?: (e: AnimationEvent<HTMLDivElement>) => void;
}

const ProgressBar = (props: ProgressBarProps) => {
  const {
    progress,
    appearance = "primary",
    height = "4px",
    animated = false,
    border = true,
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
      $border={border}
      $appearance={appearance}
      $height={height}
    >
      <StyledProgressBar
        id="progress-bar"
        $appearance={appearance}
        $height={height}
        $progress={progress}
        $animated={animated}
        onAnimationEnd={interceptOnProgress}
      />
    </StyledContainerProgressBar>
  );
};

export { ProgressBar };
export type { ProgressBarProps };
