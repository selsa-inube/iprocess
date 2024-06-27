import { titlesMock, actionsMock, breakPointsMock, entriesMock } from "./mocks";

import { Table, ITable } from "..";

import { props } from "../props";

const story = {
  title: "data/Table",
  component: Table,
  argTypes: props,
};

const Paginations = (args: ITable) => <Table {...args} />;
Paginations.args = {
  id: "tableId",
  titles: titlesMock,
  actions: actionsMock,
  entries: entriesMock,
  filter: "",
  pageLength: 3,
  breakpoints: breakPointsMock,
  modalTitle: "Form",
  infoTitle: "Information",
  widthFirstColumn: "60%",
};

export { Paginations };
export default story;
