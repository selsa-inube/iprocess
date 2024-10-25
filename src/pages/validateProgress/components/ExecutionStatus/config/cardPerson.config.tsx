import { MdOutlineRemoveRedEye } from "react-icons/md";
import { Icon } from "@inubekit/icon";
import { StartProcesses } from "@pages/startProcess/types";
import { formatDate } from "@utils/dates";
import { IProcessPersons } from "@pages/validateProgress/types";
import { IPersonProcess } from "@components/feedback/CardStatusExecution/types";

const normalizeDataInformationProcess = (
  entry: StartProcesses,
  estimedTimeFinish: string
) => {
  return {
    id: entry.id,
    dateExecution: formatDate(new Date(entry.plannedExecution || ""), true),
    totalPersonCoversProcess: entry.totalPerson,
    totalPersonProcessed: entry.totalPersonsProsecuted,
    estimedTimeFinish: estimedTimeFinish,
    totalPersonProcessedWithError:
      entry.detailPeopleProcessed?.processedWithErrors,
  };
};

const normalizeDataPerson = (entries: IProcessPersons[]): IPersonProcess[] =>
  entries.map((entry) => ({
    ...entry,
    id: entry.processPersonId,
    code: entry.personPublicCode,
    namePerson: entry.personName,
    dateStart: formatDate(new Date(entry.startDate), true),
    dateEnd: formatDate(new Date(entry.finishDate), true),
    status: entry.executionStatusByPerson,
    actions: actions,
  }));

const labels = [
  {
    id: "dateExecution",
    titleName: "Fecha de ejecución planeada",
  },
  {
    id: "totalPersonCoversProcess",
    titleName: "Total personas que cubre el proceso",
  },
  {
    id: "totalPersonProcessed",
    titleName: "Total personas procesadas",
  },
  {
    id: "estimedTimeFinish",
    titleName: "Tiempo estimado para finalizar",
  },
  {
    id: "totalPersonProcessedWithError",
    titleName: "Total personas procesadas con error",
  },
];

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
];

export {
  actions,
  labels,
  normalizeDataInformationProcess,
  normalizeDataPerson,
};
