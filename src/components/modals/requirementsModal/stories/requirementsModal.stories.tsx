import { useState } from "react";
import { Meta, StoryFn } from "@storybook/react";
import { BrowserRouter } from "react-router-dom";
import { Button } from "@inubekit/button";

import { RequirementsModal, RequirementsModalProps } from "../index";
import { breakPointsMock, dataMock } from "./mock";

const meta: Meta<typeof RequirementsModal> = {
  title: "modals/RequirementsModal",
  component: RequirementsModal,
  decorators: [
    (Story: StoryFn) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

const Template: StoryFn<RequirementsModalProps> = (args) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button onClick={() => setShowModal(true)}>Show Modal</Button>
      {showModal && (
        <RequirementsModal {...args} onCloseModal={() => setShowModal(false)} />
      )}
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  portalId: "portal",
  title: "Pre-validar Requisitos",
  requirements: dataMock,
  breakpoints: breakPointsMock,
};

export default meta;
