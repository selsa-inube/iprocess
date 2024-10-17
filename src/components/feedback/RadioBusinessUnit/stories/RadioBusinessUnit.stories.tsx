import { Meta, StoryFn } from "@storybook/react";
import { BrowserRouter } from "react-router-dom";

import { businessUnitDataMock } from "@mocks/businessUnits/businessUnits.mock";
import { RadioBusinessUnit, RadioBusinessUnitProps } from "../index";

const meta: Meta<typeof RadioBusinessUnit> = {
  title: "feedback/RadioBusinessUnit",
  component: RadioBusinessUnit,
  decorators: [
    (Story: StoryFn) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};
const Default = (args: RadioBusinessUnitProps) => (
  <RadioBusinessUnit {...args} />
);

Default.args = {
  id: businessUnitDataMock[2].id,
  name: "BusinessUnit",
  value: businessUnitDataMock[3].name,
  label: businessUnitDataMock[3].name,
  logo: businessUnitDataMock[3].logo,
};

export default meta;

export { Default };
