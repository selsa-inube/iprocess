import {
  MdOutlineRemoveRedEye,
  MdOutlineStart,
  MdOutlineSyncAlt,
} from "react-icons/md";
import { Icon } from "@inubekit/icon";
import { Text } from "@inubekit/text";

import { ITitle } from "@components/data/Table/props";
import { StyledContainerTitle } from "@components/data/Table/stories/styles";
import { StartProcesses } from "@pages/startProcess/types";
import { formatPrimaryDate } from "@src/utils/dates";
import { requirementsButton } from "@pages/startProcess/utils";

const scheduledNormailzeEntries = (process: StartProcesses[]) =>
  process.map((entry) => ({
    ...entry,
    id: `${entry.id}${entry.executionDate}`,
    process: entry.abbreviatedName,
    executionDate:
      entry.executionDate && formatPrimaryDate(entry.executionDate),
    requirements: requirementsButton(),
  }));

const titlesConfig = (handleOrderData: () => void) => {
  const titles: ITitle[] = [
    {
      id: "process",
      titleName: "Proceso",
      priority: 0,
    },
    {
      id: "executionDate",
      titleName: (
        <StyledContainerTitle>
          <Text type="label" size="medium" appearance="dark" textAlign="start">
            Fecha ejecución
          </Text>

          <Icon
            appearance="dark"
            icon={<MdOutlineSyncAlt />}
            size="16px"
            onClick={() => handleOrderData()}
            cursorHover
          />
        </StyledContainerTitle>
      ),
      priority: 1,
    },
    {
      id: "requirements",
      titleName: "Requisitos",
      priority: 2,
    },
  ];

  return titles;
};

const actions = [
  {
    id: "Details",
    actionName: "Detalles",
    content: () => (
      <Icon appearance="gray" icon={<MdOutlineRemoveRedEye />} size="16px" />
    ),
  },
  {
    id: "StartProcess",
    actionName: "Iniciar Proceso",
    content: () => (
      <Icon appearance="gray" icon={<MdOutlineStart />} size="16px" />
    ),
  },
];

const breakPoints = [{ breakpoint: "(min-width: 1091px)", totalColumns: 3 }];

export { titlesConfig, actions, breakPoints, scheduledNormailzeEntries };
