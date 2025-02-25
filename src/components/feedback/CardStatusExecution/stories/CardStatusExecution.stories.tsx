import { ThemeProvider } from "styled-components";
import { BrowserRouter } from "react-router-dom";
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { Meta, StoryFn } from "@storybook/react";
import { Icon } from "@inubekit/inubekit";

import { theme } from "@config/theme";
import { CardStatusExecution, CardStatusExecutionProps } from "..";

const meta: Meta<typeof CardStatusExecution> = {
  title: "feedback/CardStatusExecution",
  component: CardStatusExecution,
  decorators: [
    (Story: StoryFn) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

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

const data = {
  processPersonId: "01",
  personPublicCode: "01515464655121",
  executionStatusByPerson: "WithoutProcessing",
  personName: "Alberto de Jesús Morales Gonzales",
  startDate: "12/31/2023 - 19:05:00",
  finishDate: "12/31/2023 - 20:15:30",
  actions: actionsMock,
};

const dataWithError = {
  processPersonId: "02",
  personPublicCode: "01515464655121",
  executionStatusByPerson: "Error",
  personName: "Alberto de Jesús Morales Gonzales",
  startDate: "12/31/2023 - 19:05:00",
  finishDate: "12/31/2023 - 20:15:30",
  actions: actionsMock,
};

const Template: StoryFn<CardStatusExecutionProps> = (args) => {
  return (
    <ThemeProvider theme={theme}>
      <CardStatusExecution {...args} />
    </ThemeProvider>
  );
};

export const Default: StoryFn<CardStatusExecutionProps> = Template.bind({});
Default.args = {
  entries: data,
 
};

export const WithError: StoryFn<CardStatusExecutionProps> = Template.bind({});
WithError.args = {
  entries: dataWithError,
 
};

export const Skeleton: StoryFn<CardStatusExecutionProps> = Template.bind({});
Skeleton.args = {
  entries: dataWithError,
  isLoading: true
 
};

export default meta;
