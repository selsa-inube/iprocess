import { MdLaunch, MdOutlineRemoveRedEye } from "react-icons/md";
import { Icon } from "@inubekit/icon";
import { SkeletonLine } from "@inubekit/skeleton";

import { StartProcesses } from "@pages/startProcess/types";
import { formatDate } from "@utils/dates";


const scheduledNormailzeEntries = (
  process: StartProcesses[],
  month: number,
  year: number,
  status:string,
) =>
  
  process.map((entry) => ({
    ...entry,
    id: entry.id,
    publicCode: entry.publicCode,
    process: entry.description,
    date: entry.date && formatDate(new Date(entry.date)),
    dateAndHour: entry.date && formatDate(new Date(entry.date), true),
    status: <SkeletonLine width="100px" />,
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
    content: () =>  (
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



export {
  actions,
  scheduledNormailzeEntries,
};
