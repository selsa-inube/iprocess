import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Meta, StoryFn } from "@storybook/react";
import { Button } from "@inubekit/button";
import { RefreshSavingProduct } from "@src/forms/savings/RefreshSavingProduct";

import { StartProcessModal, StartProcessModalProps } from "..";


const meta: Meta<typeof StartProcessModal> = {
  title: "modals/StartProcessModal",
  component: StartProcessModal,
  decorators: [
    (Story: StoryFn) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

const dataDefault = {
  id: "10",
  descriptionSuggested:
    "Los NFTs son tokens no fungibles únicos en la cadena de bloques. A diferencia de las criptomonedas",
  date: "10/Jul/2024 - 14:05:00",
};


const data = {
  id: "10",
  descriptionSuggested:
    "Los NFTs son tokens no fungibles únicos en la cadena de bloques. A diferencia de las criptomonedas",
  date: "10/Jul/2024 - 14:05:00",
  plannedAutomaticExecution: "planned automatic execution"
};

const Template: StoryFn<StartProcessModalProps> = (args) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button onClick={() => setShowModal(true)}>Show Modal</Button>
      {showModal && (
        <StartProcessModal {...args} onCloseModal={() => setShowModal(false)} />
      )}
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  portalId: "portal",
  children: (  <RefreshSavingProduct data={dataDefault}
    onStartProcess={() => true}
    setFieldsEntered={() => true} />)
};


const TemplateWithPlannedAutomatic: StoryFn<StartProcessModalProps> = (args) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button onClick={() => setShowModal(true)}>Show Modal</Button>
      {showModal && (
        <StartProcessModal {...args} onCloseModal={() => setShowModal(false)} />
      )}
    </>
  );
};

export const WithPlannedAutomaticExecution: StoryFn<StartProcessModalProps>  = TemplateWithPlannedAutomatic.bind({});
WithPlannedAutomaticExecution.args = {
  portalId: "portal",
  children: (  <RefreshSavingProduct data={data}
    onStartProcess={() => true}
    setFieldsEntered={() => true} />)
};

export default meta;
