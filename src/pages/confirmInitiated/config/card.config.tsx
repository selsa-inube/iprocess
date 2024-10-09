import {
  MdOutlineDelete,
} from "react-icons/md";
import { Icon } from "@inubekit/icon";

import { StartProcesses } from "@pages/startProcess/types";
import { formatDate } from "@utils/dates";
import { DetailsConfirmInitiated } from "../components/DetailsConfirmInitiated";
import { Requirements } from "../components/Requeriments";
import { ConfirmProcess } from "../components/Confirm";

const confirmInitiatedNormailzeEntries = (
  process: StartProcesses[],
  status: string,
  setStatus: (status: string) => void  
) =>
  process.map((entry) => ({
    ...entry,
    id: entry.id,
    process: entry.description,
    date: entry.date && formatDate(new Date(entry.date)),
    dateAndHour: entry.dateAndHour && formatDate(new Date(entry.dateAndHour), true),
    totalPerson: entry.totalPerson,
    status: (
      <Requirements
        uniqueReferenceNumber={entry.referenceNumberRequirement || ""}
        status={status}
        setStatus={setStatus}
      />
    ),
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
    content: (entry: StartProcesses) => (
      <ConfirmProcess data={entry} />
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
    titleName: "Tiempo (en segundos) que tardó la deducción de las personas a procesar",
  },
];


export { actions, labelsDetails, confirmInitiatedNormailzeEntries };
