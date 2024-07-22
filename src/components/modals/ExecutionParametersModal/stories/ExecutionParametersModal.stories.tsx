import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Meta, StoryFn } from "@storybook/react";
import { Button } from "@inubekit/button";

import { ExecutionParametersModal, ExecutionParametersModalProps } from "..";
import { breakPointsTable, data, dataTable, labels, titlesTable } from "./mock";

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

export const Default = Template.bind({});

Default.args = {
  portalId: "portal",
  labels: labels,
  data: data,
  breakPointsParametersTable: breakPointsTable,
  entriesParametersTable: dataTable,
  titlesParametersTable: titlesTable,
  
};

export default meta;
