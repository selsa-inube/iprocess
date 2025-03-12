import { BrowserRouter } from "react-router-dom";
import { useState } from "react";
import { ThemeProvider } from "styled-components";
import { Meta, StoryFn } from "@storybook/react";
import { Button } from "@inubekit/inubekit";

import {
  ProgressCardWithBarIndetermined,
  ProgressCardWithBarIndeterminedProps,
} from "..";

import { theme } from "@config/theme";
import { appearances } from "../../ProgressCardWithBarDetermined/types";


const meta: Meta<typeof ProgressCardWithBarIndetermined> = {
  title: "feedback/ProgressCardWithBarIndetermined",
  component: ProgressCardWithBarIndetermined,
  decorators: [
    (Story: StoryFn) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

const Template: StoryFn<ProgressCardWithBarIndeterminedProps> = (args) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button onClick={() => setShowModal(true)}>Show Modal</Button>
      {showModal && (
        <ProgressCardWithBarIndetermined
          {...args}
          onCancel={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export const Default: StoryFn<ProgressCardWithBarIndeterminedProps> =Template.bind({});

Default.args = {
  withButtonClose: false,
  appearance: "primary",
  portalId: "portal",
};

Default.argTypes ={
   appearance: {
    options: appearances,
    control: {
      type: "select",
    },
  },
}

const TemplateButton: StoryFn<ProgressCardWithBarIndeterminedProps> = (
  args
) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button onClick={() => setShowModal(true)}>Show Modal</Button>
      {showModal && (
        <ProgressCardWithBarIndetermined
          {...args}
          onCancel={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export const WithButtonClose: StoryFn<ProgressCardWithBarIndeterminedProps> =
  TemplateButton.bind({});

WithButtonClose.args = {
  withButtonClose: true,
  portalId: "portal",
  isProcessCompleted: true,
};

const TemplateThemed: StoryFn<ProgressCardWithBarIndeterminedProps> = (
  args
) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button onClick={() => setShowModal(true)}>Show Modal</Button>
      {showModal && (
        <ThemeProvider theme={theme}>
          <ProgressCardWithBarIndetermined
            {...args}
            onCancel={() => setShowModal(false)}
          />
        </ThemeProvider>
      )}
    </>
  );
};

export const Themed: StoryFn<ProgressCardWithBarIndeterminedProps> =
  TemplateThemed.bind({});

Themed.args = {
  withButtonClose: false,
  portalId: "portal",
};

export default meta;
