import { StartProcesses } from "@pages/startProcess/types";
import { formatDate } from "@utils/dates";
import { DetailsConfirmInitiated } from "../components/DetailsConfirmInitiated";
import { Requirements } from "../components/Requeriments";
import { ConfirmProcess } from "../components/Confirm";
import { DeleteProcessConfirmInitiated } from "../components/Delete";

const confirmInitiatedNormailzeEntries = (
  process: StartProcesses[],
  status: string,
  setStatus: (status: string) => void,  
  setDeleteProcess: (processControlId: string) => void
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
    actions: actionsConfig(setDeleteProcess),
    dateWithoutFormat: entry.date,
    plannedExecution: entry.plannedExecutionDate,
  }));

  const actionsConfig = (setDeleteProcess: (processControlId: string) => void) => {
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
    content: (entry: StartProcesses) => (
      <DeleteProcessConfirmInitiated data={entry} setDeleteProcess={setDeleteProcess} />
     ),
  },
];
return actions
  }

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


export { actionsConfig, labelsDetails, confirmInitiatedNormailzeEntries };
