import { MdImportExport } from "react-icons/md";
import { Icon } from "@inubekit/icon";
import { Text } from "@inubekit/text";
import { SkeletonLine } from "@inubekit/skeleton";

import { IActions, ITitle } from "@components/data/Table/props";
import { StyledContainerTitle } from "@components/data/Table/stories/styles";
import { StartProcesses } from "@pages/startProcess/types";
import { formatDate } from "@utils/dates";
import { Details } from "../components/Details";
import { StartProcessScheduled } from "../components/StartProcess";

const mapDetailsScheduled = (process: IActions) => {
  return {
    id: process.processCatalogId,
    aplication: process.aplication,
    process: process.abbreviatedName,
    periodicity: process.periodicity,
    executionDateAndHour: process.executionDateAndHour,
    requirements: process.requirements,
  };
};

const mapStartProcessScheduled = (
  process: IActions,
  month: string,
  year: string
) => {
  const formatDescriptionSuggested = 
    `${process.abbreviatedName} Del mes de ${month} del año ${year}, fecha estimada de ejecución es ${process.executionDateAndHour}`;
 
  return {
    id: process.processCatalogId,
    descriptionSuggested: formatDescriptionSuggested,
    date: process.executionDateAndHour,
    plannedAutomaticExecution: process.plannedAutomaticExecution,
  };
};

const scheduledNormailzeEntries = (process: StartProcesses[]) =>
  process.map((entry) => ({
    ...entry,
    id: `${entry.id}${entry.executionDate}`,
    processCatalogId: entry.id,
    process: entry.abbreviatedName,
    executionDate: entry.executionDate && formatDate(entry.executionDate),
    executionDateAndHour: formatDate(entry.executionDate, true),
    requirements: <SkeletonLine animated />,
    plannedAutomaticExecution: "planned automatic execution", //se deja este valor para hacer pruebas con los formularios los formularios
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

const labelsStartProcess = [
  {
    id: "descriptionSuggested",
    titleName: "Descripción sugerida",
  },
  {
    id: "descriptionComplementary",
    titleName: "Descripción complementaría",
  },
  {
    id: "date",
    titleName: "Fecha y hora de ejecución",
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
          <Text
            type="title"
            size="small"
            appearance="dark"
            textAlign="start"
            weight="bold"
          >
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

const actionsConfig = (selectedMonth: string, selectedYear: string) => {
  const actions = [
    {
      id: "Details",
      actionName: "Detalles",
      content: (process: IActions) => (
        <Details data={mapDetailsScheduled(process)} />
      ),
    },
    {
      id: "StartProcess",
      actionName: "Iniciar Proceso",
      content: (process: IActions) => (
        <StartProcessScheduled
          dataModal={mapStartProcessScheduled(
            process,
            selectedMonth,
            selectedYear
          )}
          id={process.processCatalogId}
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
        />
      ),
    },
  ];

  return actions;
};

const breakPoints = [{ breakpoint: "(min-width: 1091px)", totalColumns: 3 }];

export {
  titlesConfig,
  actionsConfig,
  breakPoints,
  labelsDetails,
  labelsStartProcess,
  scheduledNormailzeEntries,
};
