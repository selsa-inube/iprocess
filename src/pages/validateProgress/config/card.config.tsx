import { StartProcesses } from "@pages/startProcess/types";
import { formatDate } from "@utils/dates";
import { Details } from "../components/Details";
import { ExecutionStatus } from "../components/ExecutionStatus";
import { ProgressOfPersonsProsecuted } from "../components/ProgressOfPersonsProsecuted";

const getFormattedDate = (entry: StartProcesses) => {
  if (entry.status === "Programmed") {
    return formatDate(entry.date ? new Date(entry.date) : new Date());
  } else {
    return formatDate(
      entry.dateAndHour ? new Date(entry.dateAndHour) : new Date()
    );
  }
};

const normailzeValidateProgress = (process: StartProcesses[]) =>
  process.map((entry) => ({
    ...entry,
    id: entry.id,
    process: entry.description,
    aplication: entry.aplication,
    date: getFormattedDate(entry),
    dateAndHour:
      entry.dateAndHour && formatDate(new Date(entry.dateAndHour), true),
    totalPersonsCoversProcess: entry.totalPerson,
    totalPersonsProsecuted: <ProgressOfPersonsProsecuted id={entry.id} />,
    dailyDetail: entry.dailyDetail,
    actions: actions,
    dateWithoutFormat: entry.date,
  }));

const mapValidateProgress = (entry: StartProcesses) => {
  return {
    id: entry.id,
    aplication: entry.aplication?.abbreviatedName || "",
    process: entry.description,
    referenceNumberRequirement: entry.referenceNumberRequirement,
  };
};

const actions = [
  {
    id: "Details",
    content: (process: StartProcesses) => (
      <Details data={mapValidateProgress(process)} />
    ),
  },
  {
    id: "statusExecute",
    content: (entries: StartProcesses) => <ExecutionStatus data={entries} />,
  },
];

const labelsDetails = [
  {
    id: "aplication",
    titleName: "Aplicación",
  },
  {
    id: "process",
    titleName: "Proceso",
  },
  {
    id: "statusText",
    titleName: "Requisitos",
  },
];

export { actions, labelsDetails, normailzeValidateProgress };
