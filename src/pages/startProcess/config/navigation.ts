import { BreadcrumbItem } from "@src/types/breadcrumb.types";

const crumbsOnDemand: BreadcrumbItem[] = [
  {
    path: "/start-process",
    label: "Home",
    id: "home",
    isActive: false,
  },
  {
    path: "/start-process",
    label: "Iniciar procesos",
    id: "startProcess",
    isActive: false,
  },
  {
    path: "/start-process",
    label: "Por demanda",
    id: "onDemand",
    isActive: true,
  },
];

const crumbsScheduled: BreadcrumbItem[] = [
  {
    path: "/start-process",
    label: "Home",
    id: "home",
    isActive: false,
  },
  {
    path: "/start-process",
    label: "Iniciar procesos",
    id: "startProcess",
    isActive: false,
  },
  {
    path: "/start-process",
    label: "Programados",
    id: "scheduled",
    isActive: true,
  },
];

export { crumbsOnDemand, crumbsScheduled };

