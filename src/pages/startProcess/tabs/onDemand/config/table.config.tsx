import { MdPinInvoke } from "react-icons/md";
import { Icon } from "@inubekit/icon";
import { SkeletonLine } from "@inubekit/skeleton";

import { IActions, ITitle } from "@components/data/Table/props";
import { StartProcesses } from "@pages/startProcess/types";
import { DetailsOnDemand } from "../components/Details";

const onDemandNormailzeEntries = (process: StartProcesses[]) =>
  process.map((entry) => ({
    ...entry,
    id: `${entry.id}${entry.date}`,
    process: entry.description,
    executionDate: "",
    requirements: <SkeletonLine animated />,
  }));

const mapOndemand = (process: IActions) => {
  return {
    id: process.id,
    aplication: process.aplication,
    process: process.abbreviatedName,
    periodicity: process.periodicity,
    requirements: process.requirements,
  };
};

  const titlesOnDemand: ITitle[] = [
    {
      id: "process",
      titleName: "Proceso",
      priority: 0,
    },
    {
      id: "requirements",
      titleName: "Requisitos",
      priority: 1,
    },
  ];


const actionsOnDemand = [
  {
    id: "Details",
    actionName: "Detalles",
    content: (process: IActions) => (
      <DetailsOnDemand data={mapOndemand(process)} />
    ),
  },
  {
    id: "StartProcess",
    actionName: "Iniciar Proceso",
    content: () => (
      <Icon
        appearance="gray"
        icon={<MdPinInvoke />}
        size="16px"
        cursorHover={true}
      />
    ),
  },
];

const breakPointsOnDemand = [{ breakpoint: "(min-width: 1091px)", totalColumns: 3 }];

const labelsDetailsOnDemand = [
  {
    id: "aplication",
    titleName: "Aplicación",
  },
  {
    id: "process",
    titleName: "Proceso",
  },
  {
    id: "requirements",
    titleName: "Requerimientos",
  },
];

export {
  actionsOnDemand,
  breakPointsOnDemand,
  labelsDetailsOnDemand,
  titlesOnDemand,
  onDemandNormailzeEntries,
};
