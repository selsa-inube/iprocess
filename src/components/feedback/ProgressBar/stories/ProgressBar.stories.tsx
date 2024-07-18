/* eslint-disable @typescript-eslint/no-explicit-any */
import { BrowserRouter } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Meta, StoryFn } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import { percentageElapsed } from "./mock";
import { ProgressBar, ProgressBarProps } from "..";

const meta: Meta<typeof ProgressBar> = {
  title: "feedback/ProgressBar",
  component: ProgressBar,
  decorators: [
    (Story: StoryFn) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

const DynamicPercentage = ({ children }: any) => {
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      const newPercentage = percentageElapsed();
      if (newPercentage >= 100) {
        clearInterval(timer);
        setPercentage(100);
      } else {
        setPercentage(newPercentage);
      }
    }, 500);
    return () => clearInterval(timer);
  }, [percentage]);

  return (
    <>
      {React.cloneElement(children, {
        progress: percentage,
      })}
    </>
  );
};

export const Default = (args: ProgressBarProps) => (
  <DynamicPercentage>
    <ProgressBar {...args} />
  </DynamicPercentage>
);

Default.args = {
  height: "15px",
  appearance: "primary",
  animated: true,
  onProgress: action("onAnimationEnd"),
};

export default meta;
