import { BrowserRouter } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Meta, StoryFn } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import { ProgressBar, ProgressBarProps } from "..";
import { tokens } from "@src/design/tokens";
import { themes } from "@mocks/design/themes";
import { ThemeProvider } from "styled-components";
import { appearances } from "../types";


const calculateSeconds = (dateProcess: Date) => {
  return (
    dateProcess.getHours() * 3600 +
    dateProcess.getMinutes() * 60 +
    dateProcess.getSeconds()
  );
};
const dateStart = new Date();
const dateEnd = new Date();
dateEnd.setSeconds(dateEnd.getSeconds() + 30);
const secondStart = calculateSeconds(dateStart);
const secondEnd = calculateSeconds(dateEnd);
const totalSeconds = secondEnd - secondStart;

const calculatePercentage = (currentMoment: number) => {
  const secondsElapsed = currentMoment - secondStart;
  const secondsValid = secondsElapsed >= 0 ? secondsElapsed : 0;
  const percentage = (secondsValid / totalSeconds) * 100;
  return percentage;
};

const percentageElapsed = () => {
  const dateCurrent = new Date();
  const currentMoment = calculateSeconds(dateCurrent);
  const percentage = calculatePercentage(currentMoment);
  return percentage;
};


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

const DynamicPercentage = ({ children }: { children: React.ReactElement<{ progress: number }> }) => {
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
      {React.isValidElement(children) && React.cloneElement(children, {
        progress: percentage,
      })}
    </>
  );
};

export const Default: StoryFn<ProgressBarProps> = ({ progress, ...args }: ProgressBarProps) => (
  <DynamicPercentage>
    <ProgressBar progress={progress} {...args} />
  </DynamicPercentage>
);

Default.args = {
  height: tokens.spacing.s200,              
  withAnimated: true,
  withBorder: true,
  onProgress: action("onAnimationEnd"),
};

Default.argTypes ={
  appearance: {
   options: appearances,
   control: {
     type: "select",
   },
 },
}

const theme = {
  ...themes["basic"],
};

export const Themed: StoryFn<ProgressBarProps> = ({ progress, ...args }: ProgressBarProps) => (
  <ThemeProvider theme={theme}>
      <DynamicPercentage>
    <ProgressBar progress={progress} {...args} />
  </DynamicPercentage>
  </ThemeProvider>
);

Themed.args = {
  ...Default.args,
};

export default meta;



