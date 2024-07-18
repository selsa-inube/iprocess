/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Meta, StoryFn } from "@storybook/react";
import { Button } from "@inubekit/button";

import { ProgressCardWithBarDetermined, ProgressCardWithBarDeterminedProps } from "..";
import { percentageElapsed, totalSeconds } from "./mock";

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

const DynamicProgressCardWithBarDetermined = ({ children }: any) => {
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

const Template: StoryFn<ProgressCardWithBarDeterminedProps> = (args) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button onClick={() => setShowModal(true)}>Show Modal</Button>
      {showModal && (
        <DynamicProgressCardWithBarDetermined>
          <ProgressCardWithBarDetermined
            {...args}
            handleCancel={() => setShowModal(false)}
          />
        </DynamicProgressCardWithBarDetermined>
      )}
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  buttonClose: false,
  estime: totalSeconds,
  portalId: "portal",
  heightProgressBar: "15px",
  appearance: "primary",
};

const TemplateButton: StoryFn<ProgressCardWithBarDeterminedProps> = (args) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button onClick={() => setShowModal(true)}>Show Modal</Button>
      {showModal && (
        <DynamicProgressCardWithBarDetermined>
          <ProgressCardWithBarDetermined
            {...args}
            handleCancel={() => setShowModal(false)}
          />
        </DynamicProgressCardWithBarDetermined>
      )}
    </>
  );
};

export const WithButtonClose = TemplateButton.bind({});
WithButtonClose.args = {
  buttonClose: true,
  portalId: "portal",
  appearance: "primary",
};

export default meta;
