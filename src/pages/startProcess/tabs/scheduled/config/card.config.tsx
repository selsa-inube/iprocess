import { StartProcesses } from "@pages/startProcess/types";
import { formatDate } from "@utils/dates";
import { Details } from "../components/Details";
import { ScheduledRequirements } from "../components/ScheduledRequirements";
import { StartProcessScheduled } from "../components/StartProcess";

const scheduledNormailzeEntries = (
  process: StartProcesses[],
  month: number,
  year: number,
  status: string,
  setStatus: (status: string) => void
) =>
  process.map((entry) => ({
    ...entry,
    id: entry.id,
    publicCode: entry.publicCode,
    process: entry.description,
    date: entry.date && formatDate(new Date(entry.date)),
    dateAndHour: entry.date && formatDate(new Date(entry.date), true),
    status: (
      <ScheduledRequirements
        id={entry.id}
        month={month}
        publicCode={entry.publicCode || ""}
        plannedExecution={entry.date ? new Date(entry.date) : undefined}
        year={year}
        setStatus={setStatus}
        status={status}
      />
    ),
    statusText: status,
    dailyDetail: entry.dailyDetail,
    actions: actions,
    month: month,
    year: year,
    dateWithoutFormat: entry.dateWithoutFormat,
    executionWay: entry.executionWay,
  }));

const mapScheduled = (entry: StartProcesses) => {
  return {
    id: entry.id,
    publicCode: entry.publicCode,
    aplication: entry.aplication?.abbreviatedName,
    date: entry.dateWithoutFormat
      ? new Date(entry.dateWithoutFormat)
      : new Date(),
    process: entry.description,
    periodicity: entry.periodicity,
    statusText: entry.statusText,
    month: entry.month,
    year: entry.year,
  };
};

const mapStartProcessScheduled = (entry: StartProcesses) => {
  const formatDescriptionSuggested = 
    `${entry.description} Del mes de ${entry.month} del año ${entry.year}, fecha estimada de ejecución es ${entry.date}`;
  return {
    id: entry.id,
    descriptionSuggested: formatDescriptionSuggested,
    publicCode: entry.publicCode,
    date: entry.dateWithoutFormat,
    dateWithoutFormat: entry.dateWithoutFormat,
    month: entry.month,
    year: entry.year,
    url: entry.url,
    executionWay: entry.executionWay
  };
};

const actions = [
  {
    id: "Details",
    content: (process: StartProcesses) => 
      process.periodicity !== "Diario" && (
        <Details data={mapScheduled(process)} breakpoints={breakPoints} />
      )
     
  },
  {
    id: "StartProcess",
    content: (process: StartProcesses) =>
      process.periodicity !== "Diario" && (
        <StartProcessScheduled
          dataModal={mapStartProcessScheduled(process)}
          id={process.id}
        />
      ),
  },
];

const breakPoints = [{ breakpoint: "(min-width: 1091px)", totalColumns: 3 }];

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
    id: "statusText",
    titleName: "Requisitos",
  },
];

export { actions, labelsDetails, scheduledNormailzeEntries, mapScheduled };
