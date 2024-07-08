import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Meta, StoryFn } from "@storybook/react";
import { Button } from "@inubekit/button";

import { periodLaterYears, periodPreviousYears } from "@src/config/environment";
import { ChangePeriodModal, ChangePeriodModalProps } from "..";




const meta: Meta<typeof ChangePeriodModal> = {
  title: "modals/ChangePeriodModal",
  component: ChangePeriodModal,
  decorators: [
    (Story: StoryFn) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

const Template: StoryFn<ChangePeriodModalProps> = (args) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button onClick={() => setShowModal(true)}>Show Modal</Button>
      {showModal && (
        <ChangePeriodModal {...args} onCloseModal={() => setShowModal(false)} />
      )}
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  portalId: "modals",
  laterYears: periodLaterYears,
  previousYears: periodPreviousYears,
};

export default meta;
