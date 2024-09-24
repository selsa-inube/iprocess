import { Icon } from "@inubekit/icon";
import { MdCheckCircleOutline, MdOutlineDelete } from 'react-icons/md';

import { StartProcesses } from "@pages/startProcess/types";
import { ScheduledRequirements } from "@pages/startProcess/tabs/scheduled/components/ScheduledRequirements";
import { formatDate } from "@utils/dates";
import { DetailsConfirmInitiated } from "../components/DetailsConfirmInitiated";

const confirmInitiatedNormailzeEntries = (
  process: StartProcesses[],
  month: number,
  year: number,
  status: string,
  setStatus: (status: string) => void
) =>
  process.map((entry) => ({
    ...entry,
    id: entry.id,
    description: entry.description,
    date: entry.dateAndHour && formatDate(new Date(entry.dateAndHour)),
    dateAndHour: entry.dateAndHour && formatDate(new Date(entry.dateAndHour), true),
    totalPerson: entry.totalPerson,
    status: 
    
    (
      <ScheduledRequirements
        id={entry.id}
        month={month}
        publicCode={"undefined"}
        plannedExecution={entry.dateAndHour ? new Date(entry.dateAndHour) : undefined}
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
    dateWithoutFormat: entry.date,
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
    content: () => (
      <Icon
        appearance="dark"
        icon={<MdCheckCircleOutline />}
        size="16px"
        cursorHover
      />
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
    id: "date",
    titleName: "Fecha planeada de ejecución",
  },
  {
    id: "timeUsedToInsertPeople",
    titleName: "Tiempo (en minutos) que tardó la deducción de las personas a procesar",
  },
];


export { actions, labelsDetails, confirmInitiatedNormailzeEntries };
