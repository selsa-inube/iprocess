import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Meta, StoryFn } from "@storybook/react";

import { Button } from "@inubekit/inubekit";
import { DetailModal, DetailModalProps } from "..";

const meta: Meta<typeof DetailModal> = {
  title: "modals/DetailModal",
  component: DetailModal,
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
  aplication: "Tesoreria",
  proceso:
    "Not specified for the event confirmationpaymentinexternalaccount / StartPaymentWorkflow",
  descriptionError:
    "Los NFTs son tokens no fungibles únicos en la cadena de bloques. A diferencia de las criptomonedas, cada NFT es único. Se utilizan para certificar la propiedad de activos digitales y físicos.",
  periodicity: "Diario",
  executionDate: "31/DIC/2024 - 01:00:40",
  requirements: "Cumple",
};

const labels = [
  {
    id: "aplication",
    titleName: "Aplicación",
  },
  {
    id: "process",
    titleName: "Proceso",
    priority: 1,
  },
  {
    id: "descriptionError",
    titleName: "Descripción del error",
  },
  {
    id: "periodicity",
    titleName: "Periodicidad",
  },
  {
    id: "executionDate",
    titleName: "Fecha Estimada de Ejecución",
  },
  {
    id: "requirements",
    titleName: "Requerimientos",
  },
];

const Template: StoryFn<DetailModalProps> = (args) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button onClick={() => setShowModal(true)}>Show Modal</Button>
      {showModal && (
        <DetailModal {...args} onCloseModal={() => setShowModal(false)} />
      )}
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  portalId: "portal",
  title: "Detalle",
  data: data,
  labels: labels,
};

export default meta;
