import { MdLaunch } from "react-icons/md";
import { Icon } from "@inubekit/icon";

import { StartProcesses } from "@pages/startProcess/types";
import { formatDate } from "@utils/dates";
import { breakPointsMock } from "@components/modals/RequirementsModal/stories/mock";
import { Details } from "../components/Details";
import { ScheduledRequirements } from "../components/ScheduledRequirements";

const scheduledNormailzeEntries = (
  process: StartProcesses[],
  month: number,
  year: number,
  status:string,
  setStatus: (status: string) => void,
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
        publicCode={entry.publicCode}
        plannedExecution={entry.date ? new Date(entry.date) : undefined}
        year={year}
        setStatus={setStatus}
      />
    ),
    statusText: status,
    actions: actions,
    month: month,
    year: year,
    dateWithoutFormat: entry.date,
  }));

const mapScheduled = (entry: StartProcesses) => {
  return {
    id: entry.id,
    publicCode: entry.publicCode,
    aplication: entry.aplication,
    date: entry.dateWithoutFormat ? new Date(entry.dateWithoutFormat) : new Date(),
    process: entry.description,
    periodicity: entry.periodicity,
    statusText: entry.statusText,
    month: entry.month,
    year: entry.year,
  };
};

const actions = [
  {
    id: "Details",
    content: (process: StartProcesses) => (
      <Details data={mapScheduled(process)} breakpoints={breakPointsMock}
      />
    ),
  },
  {
    id: "StartProcess",
    content: () => (
      <Icon
        appearance="gray"
        icon={<MdLaunch />}
        size="16px"
        cursorHover={true}
      />
    ),
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
