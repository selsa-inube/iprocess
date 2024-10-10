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

  const mapConfirmInitiated = (entry: StartProcesses) => {
    return {
      id: entry.id,
      description: entry.description,
      executionOfTheProcess: entry.executionOfTheProcess, 
      generalError: entry.generalError,
      plannedExecution: entry.date && formatDate(new Date(entry.date), true),
      timeUsedToInsertPeople: entry.timeUsedToInsertPeople,
      Aplication: entry.aplication?.abbreviatedName,
      executionParameters: entry.executionParameters,
    }
  }

  const actionsConfig = (setDeleteProcess: (processControlId: string) => void) => {
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
    content: (entry: StartProcesses) => (
      <DeleteProcessConfirmInitiated data={entry} setDeleteProcess={setDeleteProcess} />
     ),
  },
];
return actions
  }

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


export { actionsConfig, labelsDetails, confirmInitiatedNormailzeEntries };
