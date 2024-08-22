import { ThemeProvider } from "styled-components";
import { BrowserRouter } from "react-router-dom";
import { Meta, StoryFn } from "@storybook/react";

import { theme } from "@src/config/theme";
import { Tooltip, TooltipProps } from "..";

const meta: Meta<typeof Tooltip> = {
  title: "feedback/Tooltip",
  component: Tooltip,
  decorators: [
    (Story: StoryFn) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

const Template: StoryFn<TooltipProps> = (args) => {
  return (
    <ThemeProvider theme={theme}>
      <Tooltip {...args} />
    </ThemeProvider>
  );
};

export const Default: StoryFn<TooltipProps> = Template.bind({});
Default.args = {
  description: "Puede hacer clic en el botón para prevalidar los requisitos.",
};


export default meta;
