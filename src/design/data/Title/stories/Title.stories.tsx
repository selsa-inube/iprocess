import { BrowserRouter } from "react-router-dom";
import { MdDoorBack } from "react-icons/md";
import { Meta, StoryFn } from "@storybook/react";
import { Title, TitleProps } from "../index";

const meta: Meta<typeof Title> = {
  title: "data/Title",
  component: Title,
  decorators: [
    (Story: StoryFn) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

const Template: StoryFn<TitleProps> = (args) => <Title {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: "Title",
};

export const WithCustomIcon = Template.bind({});
WithCustomIcon.args = {
  title: "Title",
  icon: <MdDoorBack />,
  navigatePage: "/",
};

export default meta;
