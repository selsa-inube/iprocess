import {
    MdOutlineRemoveRedEye,
    MdLaunch,
    MdCheckCircleOutline,
    MdOutlineSubtitles,
    MdOutlineDelete,
  } from "react-icons/md";
import { Icon } from "@inubekit/icon";
import { Tag } from "@inubekit/tag";
import { IProcess } from "@src/components/feedback/CardProcess/types";


const actionsStartprocess = [
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
    id: "StartProcess",
    content: (process: IProcess) => (
      <Icon
        appearance="dark"
        icon={<MdLaunch />}
        size="16px"
        cursorHover
        disabled={
          process.statusText === "Cumple" ||
          process.statusText === "No Definido"
        }
      />
    ),
  },
];

const actionsConfirmInitiated = [
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

const actionsValidateProcess = [
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

const actionsFinished = [
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

export const dataStartprocess = {
  id: "01",
  description:
    "Not specified for the event confirmationpaymentinexternalaccount / StartPaymentWorkflow",
  periodicity: "Diaria",
  date: "31/DIC/2024",
  statusText: "Cumple",
  status: <Tag label="Cumple" appearance="success" weight="strong" />,
  actions: actionsStartprocess,
};

export const dataStartprocessWithInfo = {
  id: "01",
  description:
    "Not specified for the event confirmationpaymentinexternalaccount / StartPaymentWorkflow",
  date: "31/DIC/2024",
  statusText: "Sin Evaluar",
  status: <Tag label="Sin Evaluar" appearance="warning" weight="strong" />,
  actions: actionsStartprocess,
};

export const dataConfirmInitiated = {
  id: "01",
  description:
    "Not specified for the event confirmationpaymentinexternalaccount / StartPaymentWorkflow",
  date: "31/DIC/2024",
  statusText: "No Cumple",
  status: <Tag label="No Cumple" appearance="danger" weight="strong" />,
  actions: actionsConfirmInitiated,
  totalPersons: 999,
};

export const dataValidateProcess = {
  id: "01",
  description:
    "Not specified for the event confirmationpaymentinexternalaccount / StartPaymentWorkflow",
  date: "31/DIC/2024",
  statusText: "Cumple",
  status: <Tag label="Cumple" appearance="success" weight="strong" />,
  actions: actionsValidateProcess,
  totalPersonsProsecuted: 1100,
  totalPersonsCoversProcess: 1200,
};

export const dataFinished = {
  id: "01",
  description:
    "Not specified for the event confirmationpaymentinexternalaccount / StartPaymentWorkflow",
  date: "31/DIC/2024",
  statusText: "No Cumple",
  status: <Tag label="No Cumple" appearance="danger" weight="strong" />,
  actions: actionsFinished,
  totalPersonsProsecuted: 1100,
  totalPersonsCoversProcess: 1200,
  duration: 30,
};
