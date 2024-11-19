import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Meta, StoryFn } from "@storybook/react";
import { Button } from "@inubekit/button";

import { StatusOfExecutionModal, StatusOfExecutionModalProps } from "..";

const meta: Meta<typeof StatusOfExecutionModal> = {
  title: "modals/StatusOfExecutionModal",
  component: StatusOfExecutionModal,
  decorators: [
    (Story: StoryFn) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

const dataInformationProcess = {
  id: "10",
  dateExecution: "10/Jul/2024 - 14:05:00",
  totalPersonCoversProcess: "1000",
  totalPersonProcessed: "100",
  estimedTimeFinish: "200",
  totalPersonProcessedWithError: "0",
};

const labels = [
  {
    id: "dateExecution",
    titleName: "Fecha de ejecución planeada",
  },
  {
    id: "totalPersonCoversProcess",
    titleName: "Total personas que cubre el proceso",
  },
  {
    id: "totalPersonProcessed",
    titleName: "Total personas procesadas",
  },
  {
    id: "estimedTimeFinish",
    titleName: "Tiempo estimado para finalizar",
  },
  {
    id: "totalPersonProcessedWithError",
    titleName: "Total personas procesadas con error",
  },
];

const Template: StoryFn<StatusOfExecutionModalProps> = (args) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button onClick={() => setShowModal(true)}>Show Modal</Button>
      {showModal && (
        <StatusOfExecutionModal
          {...args}
          onCloseModal={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  portalId: "portal",
  labels,
  dataInformationProcess,
  processControlId: "10",
};

export default meta;
