import { MdImportExport, MdOutlineRemoveRedEye, MdLaunch } from "react-icons/md";
import { Icon } from "@inubekit/icon";
import { Text } from "@inubekit/text";

import {  ITitle } from "@components/data/Table/props";
import { StyledContainerTitle } from "@components/data/Table/stories/styles";
import { IDailyDetail } from "@pages/startProcess/types";
import { formatDate } from "@utils/dates";
import { ScheduledRequirements } from "../../ScheduledRequirements";

const processesDailyNormailzeEntries = (process: IDailyDetail[], month: number,
  year: number,
  setStatus: (status: string) => void,) =>
  process.map((entry) => ({
    ...entry,
    id: String(`${entry.processCatalogId}${entry.estimatedExecutionDate}`),
    executionDate: entry.estimatedExecutionDate && formatDate(new Date(entry.estimatedExecutionDate)),
    requirements: (
      <ScheduledRequirements
        id={entry.processCatalogId}
        month={month}
        publicCode={entry.publicCode}
        plannedExecution={entry.estimatedExecutionDate ? new Date(entry.estimatedExecutionDate) : undefined}
        year={year}
        setStatus={setStatus}
      />
    ),
  }));


const titlesConfig = (handleOrderData: () => void) => {
  const titles: ITitle[] = [
    {
      id: "executionDate",
      titleName: (
        <StyledContainerTitle>
          <Text type="title" size="small" appearance="dark" textAlign="start" weight="bold">
            Fecha estimada de ejecución
          </Text>

          <Icon
            appearance="dark"
            icon={<MdImportExport />}
            size="16px"
            onClick={() => handleOrderData()}
            cursorHover
          />
        </StyledContainerTitle>
      ),
      priority: 0,
    },
    {
      id: "requirements",
      titleName: "Requisitos",
      priority: 1,
    },
  ];

  return titles;
};

const actions = [
  {
    id: "Details",
    actionName: "Detalles",
    content: () => (
      <Icon
        appearance="gray"
        icon={<MdOutlineRemoveRedEye />}
        size="16px"
        cursorHover={true}
      />
    ),
  },
  {
    id: "StartProcess",
    actionName: "Iniciar Proceso",
    content: () => (
      <Icon
        appearance="gray"
        icon={<MdLaunch />}
        size="16px"
        cursorHover={true}
      />
    ),
  },
];

const breakPoints = [{ breakpoint: "(min-width: 1091px)", totalColumns: 3 }];

export {
  titlesConfig,
  actions,
  breakPoints,
  processesDailyNormailzeEntries,
};
