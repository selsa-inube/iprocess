import { BrowserRouter } from "react-router-dom";
import { Meta, StoryFn, StoryObj } from "@storybook/react";

import { Text } from "@inubekit/inubekit";
import { Accordion, IAccordionProps } from "..";

const meta: Meta<typeof Accordion> = {
  title: "components/data/Accordion",
  component: Accordion,
  decorators: [
    (Story: StoryFn) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

export type MockDataSummaryPage = typeof mockDataSummaryPage;

const mockDataSummaryPage = [
  {
    section: "Información general",
    attributes: [
      {
        attribute: "Nombre del caso de uso",
        value: "Créditos aprobados",
      },
      {
        attribute: "Descripción",
        value: "Argentina",
      },
      {
        attribute: "Opción cliente servidor",
        value: "81544670",
      },
      {
        attribute: "Opción web",
        value: "20/Nov/2001",
      },
    ],
    attributesButton: {
      text: "Regresar a este paso",
      path: "/",
    },
  },
  {
    section: "Cliente servidor",
    attributes: [
      {
        attribute: "Seleccione cliente servidor",
        value: "Colombia",
      },
    ],
    attributesButton: {
      text: "Regresar a este paso",
      path: "/",
    },
  },
];

type Story = StoryObj<typeof Accordion>;

export const Default: Story = (args: IAccordionProps) => (
  <Accordion {...args} />
);
Default.args = {
  title: "Datos generales",
  isOpen: true,
  divider: true,
  children: <Text></Text>,
};

export default meta;
