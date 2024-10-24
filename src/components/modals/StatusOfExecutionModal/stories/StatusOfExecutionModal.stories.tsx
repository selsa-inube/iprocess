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
    id: "01",
    code: "01515464655121",
    status: "Raw",
    namePerson: "Alberto de Jesús Morales Gonzales",
    dateStart: "12/31/2023 - 19:05:00",
    dateEnd: "12/31/2023 - 20:15:30",
    actions: actionsMock,
  },
  {
    id: "02",
    code: "01515464655121",
    status: "Error",
    namePerson: "Jose Perez Ortiz",
    dateStart: "12/31/2023 - 19:05:00",
    dateEnd: "12/31/2023 - 20:15:30",
    actions: actionsMock,
  },
  {
    id: "03",
    code: "0177777755121",
    status: "Raw",
    namePerson: "Martha Liliana Florez Quiroga",
    dateStart: "12/31/2023 - 19:05:00",
    dateEnd: "12/31/2023 - 20:15:30",
    actions: actionsMock,
  },
  {
    id: "04",
    code: "962451540025",
    status: "Error",
    namePerson: "Wendy Tatiana Maldonado Vargas",
    dateStart: "12/31/2023 - 19:05:00",
    dateEnd: "12/31/2023 - 20:15:30",
    actions: actionsMock,
  },
  {
    id: "05",
    code: "546547855121",
    status: "Raw",
    namePerson: "Daniel Felipe Fernadez Quintero",
    dateStart: "12/31/2023 - 19:05:00",
    dateEnd: "12/31/2023 - 20:15:30",
    actions: actionsMock,
  },
  {
    id: "06",
    code: "545888545121",
    status: "Error",
    namePerson: "Dana Sofia Martinez Giraldo",
    dateStart: "12/31/2023 - 19:05:00",
    dateEnd: "12/31/2023 - 20:15:30",
    actions: actionsMock,
  },
  {
    id: "07",
    code: "00245451544",
    status: "Error",
    namePerson: "Tomas Gaitan Salazar",
    dateStart: "12/31/2023 - 19:05:00",
    dateEnd: "12/31/2023 - 20:15:30",
    actions: actionsMock,
  },
  {
    id: "08",
    code: "8723230044",
    status: "Raw",
    namePerson: "Esteban Jose Quiñonez Fernandez",
    dateStart: "12/31/2023 - 19:05:00",
    dateEnd: "12/31/2023 - 20:15:30",
    actions: actionsMock,
  },
  {
    id: "09",
    code: "545888545121",
    status: "Error",
    namePerson: "Martina Suarez Novoa",
    dateStart: "12/31/2023 - 19:05:00",
    dateEnd: "12/31/2023 - 20:15:30",
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
  attributes: ["code", "status", "namePerson", "dateStart", "dateEnd"],
};

export default meta;
