import { BrowserRouter } from "react-router-dom";
import { useState } from "react";
import { Meta, StoryFn } from "@storybook/react";
import { Button } from "@inubekit/button";

import {
  ProgressCardWithBarIndetermined,
  ProgressCardWithBarIndeterminedProps,
} from "..";

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

export const Default: StoryFn<ProgressCardWithBarIndeterminedProps> =
  Template.bind({});

Default.args = {
  withButtonClose: false,
  portalId: "portal",
  appearance: "primary",
};

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
  appearance: "primary",
};

export default meta;
