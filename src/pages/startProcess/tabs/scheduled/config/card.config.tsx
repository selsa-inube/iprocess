import { MdOutlineRemoveRedEye } from "react-icons/md";
import { Icon } from "@inubekit/icon";
import { SkeletonLine } from "@inubekit/skeleton";

import { StartProcesses } from "@pages/startProcess/types";
import { formatDate } from "@utils/dates";
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
    status: <SkeletonLine width="100px" animated />,
    statusText: status,
    actions: actions,
    month: month,
    year: year,
    dateWithoutFormat: entry.date,
    setStatus,
  }));

const mapStartProcessScheduled = (entry: StartProcesses) => {
  const formatDescriptionSuggested = 
      `${entry.description} Del mes de ${entry.month} del año ${entry.year}, fecha estimada de ejecución es ${entry.dateAndHour}`;
  return {
    id: entry.description,
    descriptionSuggested: formatDescriptionSuggested,
    date: entry.dateAndHour,
    dateWithoutFormat: entry.dateWithoutFormat,
  };
};

const actions = [
  {
    id: "Details",
    content: () => (
      <Icon
        appearance="gray"
        icon={<MdOutlineRemoveRedEye />}
        size="16px"
        cursorHover={true}
      />
    ),
  },
  {
    id: "StartProcess",
    content: (process: StartProcesses) => (
      process.periodicity !== "" && <StartProcessScheduled
        dataModal={mapStartProcessScheduled(process)}
        id={process.id}
        selectedMonth={process.month!}
        selectedYear={process.year!}
      />
    ),
  },
];

export { actions, scheduledNormailzeEntries };
