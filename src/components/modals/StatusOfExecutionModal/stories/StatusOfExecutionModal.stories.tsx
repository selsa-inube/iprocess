import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { Meta, StoryFn } from "@storybook/react";
import { Button } from "@inubekit/button";
import { Icon } from "@inubekit/icon";

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

const actionsMock = [
  {
    id: "Details",
    content: () => (
      <Icon
        appearance="dark"
        icon={<MdOutlineRemoveRedEye />}
        size="16px"
        cursorHover
      />
    ),
  },
];

const dataPerson = [
  {
    processPersonId: "01",
    personPublicCode: "01515464655121",
    executionStatusByPerson: "WithoutProcessing",
    personName: "Alberto de Jesús Morales Gonzales",
    startDate: "12/31/2023 - 19:05:00",
    finishDate: "12/31/2023 - 20:15:30",
    actions: actionsMock,
  },
  {
    processPersonId: "02",
    personPublicCode: "01515464655121",
    executionStatusByPerson: "Error",
    personName: "Jose Perez Ortiz",
    startDate: "12/31/2023 - 19:05:00",
    finishDate: "12/31/2023 - 20:15:30",
    actions: actionsMock,
  },
  {
    processPersonId: "03",
    personPublicCode: "0177777755121",
    executionStatusByPerson: "WithoutProcessing",
    personName: "Martha Liliana Florez Quiroga",
    startDate: "12/31/2023 - 19:05:00",
    finishDate: "12/31/2023 - 20:15:30",
    actions: actionsMock,
  },
  {
    processPersonId: "04",
    personPublicCode: "962451540025",
    executionStatusByPerson: "Error",
    personName: "Wendy Tatiana Maldonado Vargas",
    startDate: "12/31/2023 - 19:05:00",
    finishDate: "12/31/2023 - 20:15:30",
    actions: actionsMock,
  },
  {
    processPersonId: "05",
    personPublicCode: "546547855121",
    executionStatusByPerson: "WithoutProcessing",
    personName: "Daniel Felipe Fernadez Quintero",
    startDate: "12/31/2023 - 19:05:00",
    finishDate: "12/31/2023 - 20:15:30",
    actions: actionsMock,
  },
  {
    processPersonId: "06",
    personPublicCode: "545888545121",
    executionStatusByPerson: "Error",
    personName: "Dana Sofia Martinez Giraldo",
    startDate: "12/31/2023 - 19:05:00",
    finishDate: "12/31/2023 - 20:15:30",
    actions: actionsMock,
  },
  {
    processPersonId: "07",
    personPublicCode: "00245451544",
    executionStatusByPerson: "Error",
    personName: "Tomas Gaitan Salazar",
    startDate: "12/31/2023 - 19:05:00",
    finishDate: "12/31/2023 - 20:15:30",
    actions: actionsMock,
  },
  {
    processPersonId: "08",
    personPublicCode: "8723230044",
    executionStatusByPerson: "WithoutProcessing",
    personName: "Esteban Jose Quiñonez Fernandez",
    startDate: "12/31/2023 - 19:05:00",
    finishDate: "12/31/2023 - 20:15:30",
    actions: actionsMock,
  },
  {
    processPersonId: "09",
    personPublicCode: "545888545121",
    executionStatusByPerson: "Error",
    personName: "Martina Suarez Novoa",
    startDate: "12/31/2023 - 19:05:00",
    finishDate: "12/31/2023 - 20:15:30",
    actions: actionsMock,
  }
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
  dataPerson,
  attributes: ["personPublicCode", "executionStatusByPerson", "personName", "startDate", "finishDate"],
};

export default meta;
