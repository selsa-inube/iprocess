import { Icon } from "@inubekit/icon";
import {
  MdCheckCircleOutline,
  MdOutlineDelete,
  MdOutlineRemoveRedEye,
} from "react-icons/md";

import { StartProcesses } from "@pages/startProcess/types";
import { formatDate } from "@utils/dates";
import { ScheduledRequirements } from "@pages/startProcess/tabs/scheduled/components/ScheduledRequirements";

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
    publicCode: entry.publicCode,
    process: entry.description,
    date: entry.dateAndHour && formatDate(new Date(entry.dateAndHour)),
    dateAndHour: entry.dateAndHour && formatDate(new Date(entry.dateAndHour), true),
    totalPerson: entry.totalPerson,
    status: (
      <ScheduledRequirements
        id={entry.id}
        month={month}
        publicCode={"undefined"}
        plannedExecution={
          entry.dateAndHour ? new Date(entry.dateAndHour) : undefined
        }
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
    content: () => (
      <Icon
        appearance="dark"
        icon={<MdOutlineRemoveRedEye />}
        size="16px"
        cursorHover
      />
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

export { actions, confirmInitiatedNormailzeEntries };
