import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Meta, StoryFn } from "@storybook/react";

import { Button } from "@inubekit/button";
import { ChangeDateModal, ChangeDateModalProps } from "..";



const meta: Meta<typeof ChangeDateModal> = {
  title: "modals/ChangeDateModal",
  component: ChangeDateModal,
  decorators: [
    (Story: StoryFn) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

const Template: StoryFn<ChangeDateModalProps> = (args) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button onClick={() => setShowModal(true)}>Show Modal</Button>
      {showModal && (
        <ChangeDateModal {...args} onCloseModal={() => setShowModal(false)} />
      )}
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  portalId: "modals",
  laterYears:3,
  previousYears: 1,
};

export default meta;
