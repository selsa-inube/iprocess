import {
  MdOutlineRemoveRedEye,
  MdOutlineSubtitles,
} from "react-icons/md";
import { Icon } from "@inubekit/icon";

import { StartProcesses } from "@pages/startProcess/types";
import { formatDate } from "@utils/dates";


const normailzeValidateProgress = (
  process: StartProcesses[],
) =>
  process.map((entry) => ({
    ...entry,
    id: entry.id,
    process: entry.description,
    date: entry.dateAndHour && formatDate(new Date(entry.dateAndHour)),
    dateAndHour:
      entry.dateAndHour && formatDate(new Date(entry.dateAndHour), true),
      totalPersonsCoversProcess: entry.totalPerson,
    totalPersonsProsecuted: entry.totalPersonsProsecuted,
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
    id: "statusExecute",
    content: () => (
      <Icon
        appearance="dark"
        icon={<MdOutlineSubtitles />}
        size="16px"
        cursorHover
      />
    ),
  },
];

export { actions, normailzeValidateProgress };
