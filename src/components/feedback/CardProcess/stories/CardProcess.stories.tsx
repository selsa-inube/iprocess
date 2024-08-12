import { ThemeProvider } from "styled-components";
import { BrowserRouter } from "react-router-dom";
import { Meta, StoryFn } from "@storybook/react";

import { theme } from "@src/config/theme";
import { CardProcess, CardProcessProps } from "..";
import {
  dataConfirmInitiated,
  dataFinished,
  dataStartprocess,
  dataStartprocessWithInfo,
  dataValidateProcess,
} from "@mocks/cardsProcess/cardsProcess.mock";

const meta: Meta<typeof CardProcess> = {
  title: "feedback/CardProcess",
  component: CardProcess,
  decorators: [
    (Story: StoryFn) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

const Template: StoryFn<CardProcessProps> = (args) => {
  return (
    <ThemeProvider theme={theme}>
      <CardProcess {...args} />
    </ThemeProvider>
  );
};

export const StartProcess: StoryFn<CardProcessProps> = Template.bind({});
StartProcess.args = {
  optionCurrent: "start process",
  entries: dataStartprocess,
  descriptionTooltip:
    "Puede hacer clic en el botón para prevalidar los requisitos .",
};

export const StartProcessWithInfo: StoryFn<CardProcessProps> = Template.bind(
  {}
);
StartProcessWithInfo.args = {
  optionCurrent: "start process",
  entries: dataStartprocessWithInfo,
  descriptionTooltip:
    "Puede hacer clic en el botón para prevalidar los requisitos .",
};

export const ConfirmInitiated: StoryFn<CardProcessProps> = Template.bind({});
ConfirmInitiated.args = {
  optionCurrent: "confirm initiated",
  entries: dataConfirmInitiated,
  descriptionTooltip:
    "Puede hacer clic en el botón para prevalidar los requisitos .",
};

export const ValidateProcess: StoryFn<CardProcessProps> = Template.bind({});
ValidateProcess.args = {
  optionCurrent: "validate process",
  entries: dataValidateProcess,
  descriptionTooltip:
    "Puede hacer clic en el botón para prevalidar los requisitos .",
};

export const Finished: StoryFn<CardProcessProps> = Template.bind({});
Finished.args = {
  optionCurrent: "finished",
  entries: dataFinished,
  descriptionTooltip:
    "Puede hacer clic en el botón para prevalidar los requisitos .",
};
export default meta;
