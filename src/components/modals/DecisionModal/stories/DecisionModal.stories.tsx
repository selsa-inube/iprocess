import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Meta, StoryFn } from "@storybook/react";
import { Button } from "@inubekit/inubekit";

import { DecisionModal, DecisionModalProps } from "..";

const meta: Meta<typeof DecisionModal> = {
  title: "modals/DecisionModal",
  component: DecisionModal,
  decorators: [
    (Story: StoryFn) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

const Template: StoryFn<DecisionModalProps> = (args) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button onClick={() => setShowModal(true)}>Show Modal</Button>
      {showModal && (
        <DecisionModal {...args} onCloseModal={() => setShowModal(false)} />
      )}
    </>
  );
};

export const DeleteProcess = Template.bind({});
DeleteProcess.args = {
  portalId: "portal",
  title: "Eliminar",
  description: "¿Confirma que desea Eliminar el Proceso?",
  actionText: "Eliminar",
  justificationOfDecision: true,
};

export const ConfirmationProcess = Template.bind({});
ConfirmationProcess.args = {
  portalId: "portal",
  title: "Confirmar",
  description: "¿Confirma que desea iniciar el Proceso?",
  actionText: "Confirmar",
};

export default meta;
