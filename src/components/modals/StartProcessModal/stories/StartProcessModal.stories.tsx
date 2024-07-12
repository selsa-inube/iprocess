import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Meta, StoryFn } from "@storybook/react";
import { Button } from "@inubekit/button";

import { StartProcessModal, StartProcessModalProps } from "..";

const meta: Meta<typeof StartProcessModal> = {
  title: "modals/StartProcessModal",
  component: StartProcessModal,
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
  descriptionSuggested:
    "Los NFTs son tokens no fungibles únicos en la cadena de bloques. A diferencia de las criptomonedas",
  date: "10/Jul/2024 - 14:05:00",
};

const labels = [
  {
    id: "descriptionSuggested",
    titleName: "Descripción sugerida",
  },
  {
    id: "descriptionComplementary",
    titleName: "Descripción complementaría",
  },
  {
    id: "date",
    titleName: "Fecha y hora de ejecución",
  },
];

const Template: StoryFn<StartProcessModalProps> = (args) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button onClick={() => setShowModal(true)}>Show Modal</Button>
      {showModal && (
        <StartProcessModal {...args} onCloseModal={() => setShowModal(false)} />
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
