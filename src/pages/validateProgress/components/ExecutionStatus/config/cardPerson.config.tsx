import { formatDate, formatTime } from "@utils/dates";
import { IPersonProcessTime } from "@pages/validateProgress/types";
import { IPersonProcess } from "@components/feedback/CardStatusExecution/types";
import { errorsStatus } from "@utils/requirements";
import { DetailsExecutionStatus } from "../DetailsExecutionStatus";

const normalizeDataInformationProcess = (
  id: string,
  entry: IPersonProcessTime
) => {
  return {
    id: id,
    dateExecution: formatDate(new Date(entry.processStartDate || ""), true),
    estimedTimeFinish: formatTime(new Date(entry.processEstimatedEndDate as string)),
    totalPersonCoversProcess: entry.totalPersons,
    totalPersonProcessed: entry.totalProcessedPersons,
    totalPersonProcessedWithError: entry.totalProcessedPersonsWithError,
  };
};

const normalizeDataPerson = (entries: IPersonProcess[], processControlId: string, ) =>
  entries.map((entry) => ({
    ...entry,
    id: entry.processPersonId,
    code: entry.personPublicCode,
    processControlId: processControlId,
    personName: entry.personName,
    startDate: entry.startDate !== "undefined" ? formatDate(new Date(entry.startDate), true) : "",
    dateEnd: formatDate(new Date(entry.finishDate), true) || "",
    status: entry.executionStatusByPerson,
    finishDate: entry.finishDate !== "undefined" ? formatDate(new Date(entry.finishDate), true) : "",
    actions: actions,
  }));

const detailsPersonData = (entries: IPersonProcess) => {
  return {
    processPersonId: entries.processPersonId,
    personName: entries.personName,
    processControlId: entries.processControlId,
    startDate: entries.startDate ,
    finishDate: entries.finishDate,
    personPublicCode: entries.personPublicCode,
  };
};

const labels = [
  {
    id: "dateExecution",
    titleName: "Fecha de ejecución planeada",
  },
  {
    id: "totalPersonCoversProcess",
    titleName: "Total personas que cubre el proceso",
  },
  {
    id: "totalPersonProcessed",
    titleName: "Total personas procesadas",
  },
  {
    id: "estimedTimeFinish",
    titleName: "Tiempo estimado para finalizar",
  },
  {
    id: "totalPersonProcessedWithError",
    titleName: "Total personas procesadas con error",
  },
];

  const actions = [
    {
      id: "Details",
      content: (entries: IPersonProcess) => (
        errorsStatus.includes(entries.executionStatusByPerson || "") &&
        <DetailsExecutionStatus data={detailsPersonData(entries)}/>
      ),
    },
  ];


const labelsDetails = [
  {
    id: "personName",
    titleName: "Nombre",
  },
  {
    id: "errorsDescription",
    titleName: "Error",
  },
  {
    id: "statusText",
    titleName: "Estado",
  },
];

export {
  actions,
  labels,
  labelsDetails,
  normalizeDataInformationProcess,
  normalizeDataPerson,
};
