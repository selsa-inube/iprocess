import {
  MdCheckCircleOutline,
  MdOutlineDelete,
  MdOutlineRemoveRedEye,
} from "react-icons/md";
import { Icon } from "@inubekit/icon";

import { StartProcesses } from "@pages/startProcess/types";
import { formatDate } from "@utils/dates";
import { Requirements } from "../components/Requeriments";

const confirmInitiatedNormailzeEntries = (
  process: StartProcesses[],
  status: string,
  setStatus: (status: string) => void
) =>
  process.map((entry) => ({
    ...entry,
    id: entry.id,
    process: entry.description,
    date: entry.dateAndHour && formatDate(new Date(entry.dateAndHour)),
    dateAndHour:
      entry.dateAndHour && formatDate(new Date(entry.dateAndHour), true),
    totalPerson: entry.totalPerson,
    status: (
      <Requirements
        uniqueReferenceNumber={entry.referenceNumberRequirement || ""}
        status={status}
        setStatus={setStatus}
      />
    ),
    dailyDetail: entry.dailyDetail,
    actions: actions,
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
