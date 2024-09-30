import {
  MdCheckCircleOutline,
  MdOutlineDelete,
} from "react-icons/md";
import { SkeletonLine } from '@inubekit/skeleton';
import { Icon } from "@inubekit/icon";

import { StartProcesses } from "@pages/startProcess/types";
import { formatDate } from "@utils/dates";
import { DetailsConfirmInitiated } from "../components/DetailsConfirmInitiated";

const confirmInitiatedNormailzeEntries = (
  process: StartProcesses[],  
) =>
  process.map((entry) => ({
    ...entry,
    id: entry.id,
    process: entry.description,
    date: entry.date && formatDate(new Date(entry.date)),
    dateAndHour: entry.dateAndHour && formatDate(new Date(entry.dateAndHour), true),
    totalPerson: entry.totalPerson,
    status: <SkeletonLine width="80px" animated />,
    dailyDetail: entry.dailyDetail,
    actions: actions,
    dateWithoutFormat: entry.date,
    plannedExecution: entry.plannedExecutionDate,
  }));


const actions = [
  {
    id: "Details",
    content: (process: StartProcesses) => (
      <DetailsConfirmInitiated data={process} />
    ),
  },
  {
    id: "verification",
    content: () => (
      <Icon
        appearance="dark"
        icon={<MdCheckCircleOutline />}
        size="16px"
        cursorHover
      />
    ),
  },
  {
    id: "delete",
    content: () => (
      <Icon
        appearance="dark"
        icon={<MdOutlineDelete />}
        size="16px"
        cursorHover
      />
    ),
  },
];

const labelsDetails = [
  {
    id: "processControlId",
    titleName: "Aplicación",
  },
  {
    id: "description",
    titleName: "Descripción",
    priority: 1,
  },
  {
    id: "executionOfTheProcess",
    titleName: "Forma de ejecución",
  },
  {
    id: "generalError",
    titleName: "Error",
  },
  {
    id: "plannedExecution",
    titleName: "Fecha planeada de ejecución",
  },
  {
    id: "timeUsedToInsertPeople",
    titleName: "Tiempo (en minutos) que tardó la deducción de las personas a procesar",
  },
];


export { actions, labelsDetails, confirmInitiatedNormailzeEntries };
