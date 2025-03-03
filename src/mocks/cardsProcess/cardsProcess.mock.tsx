import {
  MdOutlineRemoveRedEye,
  MdLaunch,
  MdCheckCircleOutline,
  MdOutlineSubtitles,
  MdOutlineDelete,
  MdInfoOutline,
} from "react-icons/md";

import { Stack, Icon } from "@inubekit/inubekit";
import { Tag } from "@inubekit/tag";
import { IProcess } from "@components/feedback/CardProcess/types";
import { Tooltip } from "@design/feedback/Tooltip";
import { tokens } from "@design/tokens";

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
          process.statusText === "No Cumple" ||
          process.statusText === "Sin Evaluar"
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
  publicCode: "01",
  description:
    "Not specified for the event confirmationpaymentinexternalaccount / StartPaymentWorkflow",
  periodicity: "Diario",
  status: <Tag label="Cumple" appearance="success" weight="strong" />,
  actions: actionsStartprocess,
};

export const dataStartProcessWithNoDefined = {
  id: "01",
  publicCode: "01",
  description:
    "Not specified for the event confirmationpaymentinexternalaccount / StartPaymentWorkflow",
  periodicity: "Diario",
  status: <Tag label="No Definido" appearance="gray" weight="strong" />,
  actions: actionsStartprocess,
};

export const dataStartprocessWithInfo = {
  id: "01",
  publicCode: "01",
  description:
    "Not specified for the event confirmationpaymentinexternalaccount / StartPaymentWorkflow",
  date: "31/DIC/2024",
  periodicity: "Mensual",
  status: (
    <Stack gap={tokens.spacing.s050}>
      <Stack height="80%">
        <Tag label="Sin Evaluar" appearance="warning" weight="strong" />
      </Stack>
      <Tooltip
        description="Puede hacer clic en el botón para prevalidar los requisitos"
        appearanceIcon="dark"
        icon={<MdInfoOutline />}
        sizeIcon="16px"
      />
    </Stack>
  ),
  actions: actionsStartprocess,
};

export const dataConfirmInitiated = {
  id: "01",
  publicCode: "01",
  description:
    "Not specified for the event confirmationpaymentinexternalaccount / StartPaymentWorkflow",
  date: "31/DIC/2024",
  status: (
    <Stack gap={tokens.spacing.s050}>
      <Stack height="80%">
        <Tag label="No Cumple" appearance="danger" weight="strong" />
      </Stack>
      <Tooltip
        description="Puede hacer clic en el botón para prevalidar los requisitos"
        appearanceIcon="dark"
        icon={<MdInfoOutline />}
        sizeIcon="16px"
      />
    </Stack>
  ),
  actions: actionsConfirmInitiated,
  totalPersons: 999,
};

export const dataValidateProcess = {
  id: "01",
  publicCode: "01",
  description:
    "Not specified for the event confirmationpaymentinexternalaccount / StartPaymentWorkflow",
  date: "31/DIC/2024",
  status: <Tag label="Cumple" appearance="success" weight="strong" />,
  actions: actionsValidateProcess,
  totalPersonsProsecuted: 1100,
  totalPersonsCoversProcess: 1200,
};

export const dataFinished = {
  id: "01",
  publicCode: "01",
  description:
    "Not specified for the event confirmationpaymentinexternalaccount / StartPaymentWorkflow",
  date: "31/DIC/2024",
  status: <Tag label="No Cumple" appearance="danger" weight="strong" />,
  actions: actionsFinished,
  totalPersonsProsecuted: 1100,
  totalPersonsCoversProcess: 1200,
  duration: 30,
};
