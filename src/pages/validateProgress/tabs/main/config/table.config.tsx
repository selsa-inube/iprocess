import { //MdOutlineRemoveRedEye,
  MdMoreVert, MdImportExport} from "react-icons/md";
import { Icon } from "@inubekit/icon";
import { Text } from "@inubekit/text";
import { SkeletonLine } from "@inubekit/skeleton";

import { ITitle, IActions } from "@components/data/Table/props";
import { StyledContainerTitle } from "@components/data/Table/stories/styles";
import { ValidateProgresses } from "@pages/validateProgress/types";
import { formatDate } from "@utils/dates";
import { requirementsButton } from "@pages/validateProgress/utils";
import { Details } from "../components/Details";

const mapMain = (progress: IActions) => {
  return {
    id: progress.id,
    aplication: progress.id,
    processDescription: progress.processDescription,
    executionDate: progress.executionDate,
    executionDateAndHour: progress.executionDateAndHour,
    generalError: progress.generalError,
    state: progress.plannedExecution,
    periodicity: progress.periodicity,
    requirements: progress.requirements,
  };
};

const mainNormailzeEntries = (progress: ValidateProgresses[]) =>
  progress.map((entry) => ({
    ...entry,
    id: `${entry.id}${entry.executionDate}`,
    process: entry.processDescription,
    executionDate: entry.executionDate && formatDate(entry.executionDate),
    executionDateAndHour: formatDate(entry.executionDate, true),
    requirements: requirementsButton(),
    state: <SkeletonLine animated/>,
  }));

const labelsDetails = [
    {
      id: "aplication",
      titleName: "Aplicación",
    },
    {
      id: "processDescription",
      titleName: "Proceso",
    },
    {
      id: "generalError",
      titleName: "Descripción error ",
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
          <Text type="title" size="small" appearance="dark" textAlign="start" weight="bold" >
            Fecha de ejecución
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
      id: "state",
      titleName: "Estado",
      priority: 2,
    },
  ];

  return titles;
};

const actions = [
  {
    id: "Details",
    actionName: "Detalles",
    content: (progress: IActions) => <Details data={mapMain(progress)}/>,
  },
  {
    id: "Options",
    actionName: "",
    content: () => (
      <Icon
        appearance="gray"
        icon={<MdMoreVert />}
        size="16px"
        cursorHover={true}
      />
    ),
  },
];

const breakPoints = [{ breakpoint: "(min-width: 1091px)", totalColumns: 3 }];

export { titlesConfig, actions, breakPoints, mainNormailzeEntries, labelsDetails };
