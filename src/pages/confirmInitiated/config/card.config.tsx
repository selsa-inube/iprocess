import {
  MdCheckCircleOutline,
  MdOutlineRemoveRedEye,
} from "react-icons/md";
import { Icon } from "@inubekit/icon";

import { StartProcesses } from "@pages/startProcess/types";
import { formatDate } from "@utils/dates";
import { Requirements } from "../components/Requeriments";
import { DeleteProcessConfirmInitiated } from "../components/Delete";

const confirmInitiatedNormailzeEntries = (
  process: StartProcesses[],
  status: string,
  setStatus: (status: string) => void,
  setDeleteProcess: (processControlId: string) => void
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
    actions: actionsConfig(setDeleteProcess),
    dateWithoutFormat: entry.date,
  }));

  const actionsConfig = (setDeleteProcess: (processControlId: string) => void) => {
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
        content: (entry: StartProcesses) => (
          <DeleteProcessConfirmInitiated data={entry} setDeleteProcess={setDeleteProcess} />
         ),
      },
    ];

    return actions;
  }



export { actionsConfig, confirmInitiatedNormailzeEntries };
