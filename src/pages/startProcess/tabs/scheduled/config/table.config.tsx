import { MdOutlineRestartAlt, MdImportExport } from "react-icons/md";
import { Icon } from "@inubekit/icon";
import { Text } from "@inubekit/text";
import { SkeletonLine } from "@inubekit/skeleton";

import { IActions, ITitle } from "@components/data/Table/props";
import { StyledContainerTitle } from "@components/data/Table/stories/styles";
import { StartProcesses } from "@pages/startProcess/types";
import { formatDate } from "@utils/dates";
import { Details } from "../components/Details";


const mapScheduled = (process: IActions) => {
  return {
    id: process.id,
    aplication: "Tesoreria",
    process: process.abbreviatedName,
    descriptionError: process.abbreviatedName,
    periodicity: "Diario",
    executionDateAndHour: process.executionDateAndHour,
    requirements: process.requirements,
  };
};

const scheduledNormailzeEntries = (process: StartProcesses[]) =>
  process.map((entry) => ({
    ...entry,
    id: `${entry.id}${entry.executionDate}`,
    process: entry.abbreviatedName,
    executionDate: entry.executionDate && formatDate(entry.executionDate),
    executionDateAndHour: formatDate(entry.executionDate, true),
    requirements: <SkeletonLine animated />,
  }));

const labelsDetails = [
  {
    id: "aplication",
    titleName: "Aplicación",
  },
  {
    id: "process",
    titleName: "Proceso",
    priority: 1,
  },
  {
    id: "descriptionError",
    titleName: "Descripción del error",
  },
  {
    id: "periodicity",
    titleName: "Periodicidad",
  },
  {
    id: "executionDateAndHour",
    titleName: "Fecha Estimada de Ejecución",
  },
  {
    id: "requirements",
    titleName: "Requerimientos",
  },
];

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
            icon={<MdImportExport />}
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
    content: (process: IActions) => <Details data={mapScheduled(process)} />,
  },
  {
    id: "StartProcess",
    actionName: "Iniciar Proceso",
    content: () => (
      <Icon
        appearance="gray"
        icon={<MdOutlineRestartAlt />}
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
  labelsDetails,
  scheduledNormailzeEntries,
};
