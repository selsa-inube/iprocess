import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Meta, StoryFn } from "@storybook/react";
import { Button } from "@inubekit/button";

import { theme } from "@src/config/theme";
import { ExecutionParametersModal, ExecutionParametersModalProps } from "..";
import { ThemeProvider } from "styled-components";


const data = {
  id: "10",
  description:
    "Los NFTs son tokens no fungibles únicos en la cadena de bloques",
  formOfExecution: "Los tokens únicos en la cadena de bloques.",
  error: "Los NFTs son tokens no fungibles únicos en la cadena de bloques",
  executionDate: "31/DIC/2024",
  time: 20,
};

const labels = [
  {
    id: "aplication",
    titleName: "Aplicación",
  },
  {
    id: "description",
    titleName: "Descripción",
    priority: 1,
  },
  {
    id: "formOfExecution",
    titleName: "Forma de ejecución",
  },
  {
    id: "error",
    titleName: "Error",
  },
  {
    id: "executionDate",
    titleName: "Fecha planeada de ejecución",
  },
  {
    id: "time",
    titleName: "Tiempo(minutos) de deducción de personas a procesar.",
  },
];

const titlesTable = [
  {
    id: "parameter",
    titleName: "Parámetro",
    priority: 0,
  },
  {
    id: "value",
    titleName: "Valor",
    priority: 0,
  },
];

const dataTable = [
  {
    id: "1",
    parameter: "Parámetro 1",
    value: "Valor",
  },
  {
    id: "2",
    parameter: "Parámetro 2",
    value: "Valor",
  },
  {
    id: "3",
    parameter: "Parámetro 3",
    value: "Valor",
  },
];

const breakPointsTable = [
  { breakpoint: "(min-width: 1091px)", totalColumns: 2 },
];

const meta: Meta<typeof ExecutionParametersModal> = {
  title: "modals/ExecutionParametersModal",
  component: ExecutionParametersModal,
  decorators: [
    (Story: StoryFn) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

const Template: StoryFn<ExecutionParametersModalProps> = (args) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button onClick={() => setShowModal(true)}>Show Modal</Button>
      {showModal && (
        <ExecutionParametersModal
          {...args}
          onCloseModal={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export const Default: StoryFn<ExecutionParametersModalProps> = Template.bind({});

Default.args = {
  portalId: "portal",
  labels: labels,
  data: data,
  breakPointsParametersTable: breakPointsTable,
  entriesParametersTable: dataTable,
  titlesParametersTable: titlesTable,
};

const TemplateThemed: StoryFn<ExecutionParametersModalProps> = (args) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button onClick={() => setShowModal(true)}>Show Modal</Button>
      {showModal && (
        <ThemeProvider theme={theme}>
          <ExecutionParametersModal
            {...args}
            onCloseModal={() => setShowModal(false)}
          />
        </ThemeProvider>
      )}
    </>
  );
};

export const Themed: StoryFn<ExecutionParametersModalProps> = TemplateThemed.bind({});

Themed.args = {
  portalId: "portal",
  labels: labels,
  data: data,
  breakPointsParametersTable: breakPointsTable,
  entriesParametersTable: dataTable,
  titlesParametersTable: titlesTable,
};

export default meta;
