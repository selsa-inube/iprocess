import { StartProcesses } from "@pages/startProcess/types";
import { formatDate } from "@utils/dates";
import { OnDemandRequirements } from "../components/OnDemandRequirements";
import { DetailsOnDemand } from "../components/Details";
import { StartProcessOnDemand } from "../components/StartProcess";

const onDemandNormailzeEntries = (
  process: StartProcesses[],
  month: number,
  year: number,
  status: string,
  setStatus: (status: string) => void
) =>
  process.map((entry) => ({
    ...entry,
    id: `${entry.id}`,
    publicCode: entry.publicCode,
    process: entry.description,
    date: formatDate(new Date()),
    status: (
      <OnDemandRequirements
        id={entry.id}
        month={month}
        publicCode={entry.publicCode}
        plannedExecution={entry.date ? new Date(entry.date) : undefined}
        year={year}
        setStatus={setStatus}
      />
    ),
    actions: actionsOnDemand,
    statusText: status,
    month: month,
    year: year,
    dateWithoutFormat: entry.date,
  }));

const mapOnDemand = (entry: StartProcesses) => {
  return {
    id: entry.id,
    publicCode: entry.publicCode,
    aplication: entry.aplication,
    date: entry.dateWithoutFormat
      ? new Date(entry.dateWithoutFormat)
      : new Date(),
    process: entry.description,
    periodicity: entry.periodicity,
    month: entry.month,
    year: entry.year,
    statusText: entry.statusText,
    executionWay: entry.executionWay,
  };
};

const mapStartProcessOnDemand = (entry: StartProcesses) => {
  const formatDescriptionSuggested = 
      `${entry.description} Del mes de ${entry.month} del año ${entry.year}, fecha estimada de ejecución es ${entry.date}`;
  return {
    id: entry.description,
    descriptionSuggested: formatDescriptionSuggested,
    publicCode: entry.publicCode,
    date: entry.dateWithoutFormat
      ? new Date(entry.dateWithoutFormat)
      : new Date(),
    month: entry.month,
    year: entry.year,
    url: entry.url,
    executionWay: entry.executionWay,
  };
};

const actionsOnDemand = [
  {
    id: "Details",
    content: (process: StartProcesses) => (
      <DetailsOnDemand data={mapOnDemand(process)} breakpoints={breakPoints} />
    ),
  },
  {
    id: "StartProcess",
    content: (process: StartProcesses) => (
      <StartProcessOnDemand
        dataModal={mapStartProcessOnDemand(process)}
        id={process.id}
      />
    ),
  },
];

const breakPoints = [{ breakpoint: "(min-width: 1091px)", totalColumns: 3 }];

const labelsDetailsOnDemand = [
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
    id: "statusText",
    titleName: "Requisitos",
  },
];

export { labelsDetailsOnDemand, mapOnDemand, onDemandNormailzeEntries };
