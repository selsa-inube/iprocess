import { useState } from "react";
import { MdClose } from "react-icons/md";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { Blanket } from "@inubekit/blanket";

import {
  titlesMock,
  actionsMock,
  breakPointsMock,
  entriesMock,
} from "./mocks";
import { props, parameters } from "../props";
import { Table, ITable } from "..";
import { StyledModal } from "./styles";

const story = {
  title: "data/Table",
  component: [Table],
  parameters,
  argTypes: props,
};

const LoremModal = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <Blanket>
      <StyledModal>
        <Stack justifyContent="space-between">
          <Text
            as="h3"
            appearance={"primary"}
            type="title"
            size="large"
            textAlign="start"
          >
            Lorem ipsum
          </Text>
          <MdClose onClick={() => setIsVisible(false)} />
        </Stack>
        <Text textAlign="center" size="medium">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
          lacinia odio vitae vestibulum.
        </Text>
      </StyledModal>
    </Blanket>
  );
};

const Default = (args: ITable) => <Table {...args} />;
Default.args = {
  id: "tableId",
  titles: titlesMock,
  actions: actionsMock,
  entries: entriesMock,
  filter: "",
  pageLength: 10,
  breakpoints: breakPointsMock,
  modalTitle: "Form",
  infoTitle: "Information",
  content: <LoremModal />,
  widthFirstColumn:"60%"
};

export { Default };
export default story;
