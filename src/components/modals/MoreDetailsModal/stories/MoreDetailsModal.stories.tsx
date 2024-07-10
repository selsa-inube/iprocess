import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Meta, StoryFn } from "@storybook/react";
import { Button } from "@inubekit/button";

import { MoreDetailsModal, MoreDetailsModalProps } from "..";

const meta: Meta<typeof MoreDetailsModal> = {
  title: "modals/MoreDetailsModal",
  component: MoreDetailsModal,
  decorators: [
    (Story: StoryFn) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

const data = {
  id: "10",
  evaluation: "No Cumple",
  description:
    "Los NFTs son tokens no fungibles únicos en la cadena de bloques. A diferencia de las criptomonedas",
};

const labels = [
  {
    id: "evaluation",
    titleName: "Evaluación",
  },
  {
    id: "description",
    titleName: "Descripción de la evaluación",
    priority: 1,
  },
];

const Template: StoryFn<MoreDetailsModalProps> = (args) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button onClick={() => setShowModal(true)}>Show Modal</Button>
      {showModal && (
        <MoreDetailsModal {...args} onCloseModal={() => setShowModal(false)} />
      )}
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  portalId: "portal",
  data: data,
  labels: labels,
};

export default meta;
