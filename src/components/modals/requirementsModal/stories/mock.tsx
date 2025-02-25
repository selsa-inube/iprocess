import { MdAddCircleOutline, MdOutlineCheckCircle } from "react-icons/md";
import { Icon } from "@inubekit/inubekit";
import { Tag } from "@inubekit/tag";

import { IAction } from "@components/data/Table/props";
import { IEntries, ITitlesRequirements } from "../types";

const titlesMock: ITitlesRequirements[][] = [
  [
    {
      id: "systemsValidationOne",
      titleName: "Validaciones del sistema",
      priority: 0,
    },
    {
      id: "tag",
      titleName: "",
      priority: 1,
    },
  ],
  [
    {
      id: "systemsValidationTwo",
      titleName: "Validaciones del sistema",
      priority: 0,
    },
    {
      id: "tag",
      titleName: "",
      priority: 1,
    },
  ],
  [
    {
      id: "systemsValidationThree",
      titleName: "Validaciones del sistema",
      priority: 0,
    },
    {
      id: "tag",
      titleName: "",
      priority: 1,
    },
  ],
];

const entriesMock: IEntries[][] = [
  [
    {
      id: "01",
      systemsValidationOne: "Que el asociado sea activo",
      tag: <Tag label="Cumple" appearance="success" weight="strong" />,
    },
    {
      id: "02",
      systemsValidationOne: "Que este al día en las obligaciones",
      tag: <Tag label="Cumple" appearance="success" weight="strong" />,
    },
    {
      id: "03",
      systemsValidationOne: "Que tenga más de 30 años",
      tag: <Tag label="No Cumple" appearance="danger" weight="strong" />,
    },
  ],
  [
    {
      id: "04",
      systemsValidationTwo: "Imagenes de la cédula de ciudadanía",
      tag: <Tag label="Cumple" appearance="success" weight="strong" />,
    },
    {
      id: "05",
      systemsValidationTwo: "Desprendible de pago",
      tag: <Tag label="Sin Evaluar" appearance="warning" weight="strong" />,
    },
    {
      id: "06",
      systemsValidationTwo: "Declaración de renta",
      tag: <Tag label="Sin Evaluar" appearance="warning" weight="strong" />,
    },
  ],
  [
    {
      id: "07",
      systemsValidationThree: "Referencias laborales",
      tag: <Tag label="Cumple" appearance="success" weight="strong" />,
    },
    {
      id: "08",
      systemsValidationThree: "Proponer un codeudor",
      tag: <Tag label="No Cumple" appearance="danger" weight="strong" />,
    },
  ],
];

const actionsMock: IAction[][] = [
  [
    {
      id: "details",
      actionName: "Más Detalles",
      content: () => (
        <Icon appearance="gray" icon={<MdAddCircleOutline />} size="16px" />
      ),
    },
    {
      id: "approvals",
      actionName: "Aprobaciones",
      content: () => (
        <Icon appearance="gray" icon={<MdOutlineCheckCircle />} size="16px" />
      ),
    },
  ],
  [
    {
      id: "details",
      actionName: "",
      content: () => (
        <Icon appearance="gray" icon={<MdAddCircleOutline />} size="16px" />
      ),
    },
    {
      id: "approvals",
      actionName: "",
      content: () => (
        <Icon appearance="gray" icon={<MdOutlineCheckCircle />} size="16px" />
      ),
    },
  ],
];

const dataMock = [
  {
    id: "table1",
    titlesRequirements: titlesMock[0],
    entriesRequirements: entriesMock[0],
    actionsRequirements: actionsMock[0],
  },
  {
    id: "table2",
    titlesRequirements: titlesMock[1],
    entriesRequirements: entriesMock[1],
    actionsRequirements: actionsMock[1],
  },
  {
    id: "table3",
    titlesRequirements: titlesMock[2],
    entriesRequirements: entriesMock[2],
    actionsRequirements: actionsMock[1],
  },
];

const breakPointsMock = [
  { breakpoint: "(min-width: 1091px)", totalColumns: 3 },
];

export { titlesMock, entriesMock, actionsMock, dataMock, breakPointsMock };
