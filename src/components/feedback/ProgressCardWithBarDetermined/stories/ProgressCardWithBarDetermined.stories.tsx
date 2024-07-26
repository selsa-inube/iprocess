import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { Meta, StoryFn } from "@storybook/react";
import { Button } from "@inubekit/button";


import { tokens } from "@src/design/tokens";
import { theme } from "@src/config/theme";
import { appearances } from "../types";
import { ProgressCardWithBarDetermined, ProgressCardWithBarDeterminedProps } from "..";

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

const meta: Meta<typeof ProgressCardWithBarDetermined> = {
  title: "feedback/ProgressCardWithBarDetermined",
  component: ProgressCardWithBarDetermined,
  decorators: [
    (Story: StoryFn) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

const DynamicProgressCardWithBarDetermined = ({ children }: { children: React.ReactElement<{ progress: number }> }) => {
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


const Template: StoryFn<ProgressCardWithBarDeterminedProps> = (args) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button onClick={() => setShowModal(true)}>Show Modal</Button>
      {showModal && (
        <DynamicProgressCardWithBarDetermined>
          <ProgressCardWithBarDetermined
            {...args}
            onCancel={() => setShowModal(false)}
          />
        </DynamicProgressCardWithBarDetermined>
      )}
    </>
  );
};

export const Default: StoryFn<ProgressCardWithBarDeterminedProps> = Template.bind({});
Default.args = {
  withButtonClose: false,
  estime: totalSeconds,
  portalId: "portal",
  heightProgressBar: tokens.spacing.s200,
  appearance: "primary",
};

Default.argTypes ={
  appearance: {
   options: appearances,
   control: {
     type: "select",
   },
 },
}

const TemplateButton: StoryFn<ProgressCardWithBarDeterminedProps> = (args) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button onClick={() => setShowModal(true)}>Show Modal</Button>
      {showModal && (
        <DynamicProgressCardWithBarDetermined>
          <ProgressCardWithBarDetermined
            {...args}
            onCancel={() => setShowModal(false)}
          />
        </DynamicProgressCardWithBarDetermined>
      )}
    </>
  );
};

export const WithButtonClose: StoryFn<ProgressCardWithBarDeterminedProps> = TemplateButton.bind({});
WithButtonClose.args = {
  withButtonClose: true,
  estime: totalSeconds,
  portalId: "portal",
  heightProgressBar: "15px",
  appearance: "primary",
};


const TemplateThemed: StoryFn<ProgressCardWithBarDeterminedProps> = (args) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button onClick={() => setShowModal(true)}>Show Modal</Button>
      {showModal && (
        <ThemeProvider theme={theme}>
        <DynamicProgressCardWithBarDetermined>
          <ProgressCardWithBarDetermined
            {...args}
            onCancel={() => setShowModal(false)}
          />
        </DynamicProgressCardWithBarDetermined>
        </ThemeProvider>
      )}
    </>
  );
};

export const Themed: StoryFn<ProgressCardWithBarDeterminedProps> = TemplateThemed.bind({});
Themed.args = {
  withButtonClose: false,
  estime: totalSeconds,
  portalId: "portal",
  heightProgressBar: tokens.spacing.s200,
  appearance: "primary",
};

export default meta;
