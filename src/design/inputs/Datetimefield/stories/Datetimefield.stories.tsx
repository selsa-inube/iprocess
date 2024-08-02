import { BrowserRouter } from "react-router-dom";
import { Meta, StoryFn } from "@storybook/react";

import { Datetimefield, DatetimefieldProps } from "..";
import { DatetimefieldController } from "./DatetimefieldController";

const meta: Meta<typeof Datetimefield> = {
  title: "inputs/Datetimefield",
  component: Datetimefield,
  decorators: [
    (Story: StoryFn) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};


export const Default = (args: DatetimefieldProps) => <DatetimefieldController {...args} />;
Default.args = {
  withFullwidth:true,
  id:"datetime",
  label:"Fecha",
  message:"Campo requerido",
  name:"datetime",
  size:"wide",
  value:"",
};

export default meta;
