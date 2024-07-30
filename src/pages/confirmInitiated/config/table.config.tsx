import {
  MdDeleteOutline,
  MdImportExport,
  MdCheckCircleOutline,
  MdOutlineRemoveRedEye
} from "react-icons/md";
import { Icon } from "@inubekit/icon";
import { Text } from "@inubekit/text";
import { SkeletonLine } from "@inubekit/skeleton";

import { ITitle } from "@components/data/Table/props";
import { StyledContainerTitle } from "@components/data/Table/stories/styles";
import { formatDate } from "@utils/dates";
import { tokens } from "@src/design/tokens";
import { IConfirmInitiated } from "../types";


const confirmInitialtedNormailzeEntries = (process: IConfirmInitiated[]) =>
  process.map((entry) => ({
    ...entry,
    id: `${entry.id}${entry.executionDate}`,
    process: entry.processName,
    executionDate: entry.executionDate && formatDate(entry.executionDate),
    executionDateAndHour: formatDate(entry.executionDate, true),
    totalPersons: entry.totalPeople,
    requirements: <SkeletonLine animated />,
  }));

const labelsDetails = [
  {
    id: "process",
    titleName: "Proceso",
    priority: 1,
  },
  {
    id: "totalPersons",
    titleName: "Total personas",
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
            size={tokens.spacing.s200}
            onClick={() => handleOrderData()}
            cursorHover
          />
        </StyledContainerTitle>
      ),
      priority: 1,
    },
    {
      id: "totalPersons",
      titleName: "Total personas",
      priority: 2,
    },
    {
      id: "requirements",
      titleName: "Requisitos",
      priority: 3,
    },
  ];

  return titles;
};

const actions = [
  {
    id: "confirm",
    actionName: "Confirmar",
    content: () => (
      <Icon
        appearance="dark"
        icon={<MdCheckCircleOutline />}
        size={tokens.spacing.s200}
        cursorHover={true}
      />
    ),
  },
  {
    id: "delete",
    actionName: "Eliminar",
    content: () => (
      <Icon
        appearance="dark"
        icon={<MdDeleteOutline />}
        size={tokens.spacing.s200}
        cursorHover={true}
      />
    ),
  },
  {
    id: "details",
    actionName: "Detalles",
    content: () => (
      <Icon
        appearance="dark"
        icon={<MdOutlineRemoveRedEye />}
        size={tokens.spacing.s200}
        cursorHover={true}
      />
    ),
  },
];

const breakPoints = [{ breakpoint: "(min-width: 1091px)", totalColumns: 5 }];

export {
  titlesConfig,
  actions,
  breakPoints,
  labelsDetails,
  confirmInitialtedNormailzeEntries,
};
