import { formatDate, formatTime } from "@utils/dates";
import {
  IDiscardPersonsWithErrorsResponse,
  IPersonProcessTime,
  IReprocessPersonsWithErrorsResponse,
} from "@pages/validateProgress/types";
import { IPersonProcess } from "@components/feedback/CardStatusExecution/types";
import { errorsStatus } from "@utils/requirements";
import { DetailsExecutionStatus } from "../components/DetailsExecutionStatus";
import { Discard } from "../components/Discard";
import { Reprocess } from "../components/Reprocess";

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

const normalizeDataPerson = (
  entries: IPersonProcess[],
  processControlId: string,
  setDiscardData: (data: IDiscardPersonsWithErrorsResponse | undefined) => void,
  setReprocessData: (
    data: IReprocessPersonsWithErrorsResponse | undefined
  ) => void
) =>
  entries.map((entry) => ({
    ...entry,
    id: entry.processPersonId,
    code: entry.personPublicCode,
    processControlId: processControlId,
    personName: entry.personName,
    startDate:
      entry.startDate !== "undefined"
        ? formatDate(new Date(entry.startDate), true)
        : "",
    dateEnd: formatDate(new Date(entry.finishDate), true) || "",
    status: entry.executionStatusByPerson,
    finishDate:
      entry.finishDate !== "undefined"
        ? formatDate(new Date(entry.finishDate), true)
        : "",
    actions: actionsConfig(setDiscardData, setReprocessData),
  }));

const detailsPersonData = (entries: IPersonProcess) => {
  return {
    processPersonId: entries.processPersonId,
    personName: entries.personName,
    processControlId: entries.processControlId,
    startDate: entries.startDate,
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

const actionsConfig = (
  setDiscardData: (data: IDiscardPersonsWithErrorsResponse | undefined) => void,
  setReprocessData: (
    data: IReprocessPersonsWithErrorsResponse | undefined
  ) => void
) => {
  const actions = [
    {
      id: "details",
      content: (entries: IPersonProcess) =>
        errorsStatus.includes(entries.executionStatusByPerson || "") && (
          <DetailsExecutionStatus data={detailsPersonData(entries)} />
        ),
    },
    {
      id: "reprocess",
      content: (entries: IPersonProcess) =>
        errorsStatus.includes(entries.executionStatusByPerson || "") && (
          <Reprocess
            data={detailsPersonData(entries)}
            setReprocessData={setReprocessData}
          />
        ),
    },
    {
      id: "discard",
      content: (entries: IPersonProcess) =>
        errorsStatus.includes(entries.executionStatusByPerson || "") && (
          <Discard
            data={detailsPersonData(entries)}
            setDiscardData={setDiscardData}
          />
        ),
    },
  ];

  return actions;
};

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
  actionsConfig,
  labels,
  labelsDetails,
  normalizeDataInformationProcess,
  normalizeDataPerson,
};
