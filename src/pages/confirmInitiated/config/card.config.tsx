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

const mapConfirmInitiated = (entry: StartProcesses) => {
  return {
    id: entry.id,
    description: entry.description,
    executionOfTheProcess: entry.executionOfTheProcess, 
    generalError: entry.generalError,
    plannedExecution: entry.plannedExecutionDate && formatDate(new Date(entry.plannedExecutionDate), true),
    timeUsedToInsertPeople: entry.timeUsedToInsertPeople,
    Aplication: entry.aplication?.abbreviatedName,
    executionParameters: entry.executionParameters,
  }
}

const actions = [
  {
    id: "Details",
    content: (process: StartProcesses) => (
      <DetailsConfirmInitiated data={mapConfirmInitiated(process)} />
    ),
  },
  {
    id: "verification",
    content: (process: StartProcesses) => (
      <ConfirmProcess data={process} />
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
    id: "Aplication",
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
