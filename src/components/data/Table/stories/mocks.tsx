import {
  MdOutlineRemoveRedEye,
  MdOutlineStart,
  MdOutlineSyncAlt,
} from "react-icons/md";
import { Text, Icon } from "@inubekit/inubekit";
import { Button } from "@inubekit/button";

import { StyledContainerButton, StyledContainerTitle } from "./styles";
import { ITitle } from "../props";

const titlesMock: ITitle[] = [
  {
    id: "process",
    titleName: "Proceso",
    priority: 0,
  },
  {
    id: "executionDate",
    titleName: (
      <StyledContainerTitle>
        <Text type="label" size="medium" appearance="dark" textAlign="start">
          Fecha ejecución
        </Text>

        <Icon
          appearance="dark"
          icon={<MdOutlineSyncAlt />}
          size="16px"
          onClick={() => {}}
          cursorHover
        />
      </StyledContainerTitle>
    ),
    priority: 1,
  },
  {
    id: "requirements",
    titleName: "Requisitos",
    priority: 2,
  },
];

const actionsMock = [
  {
    id: "Details",
    actionName: "Detalles",
    content: () => (
      <Icon appearance="gray" icon={<MdOutlineRemoveRedEye />} size="16px" />
    ),
  },
  {
    id: "StartProcess",
    actionName: "Iniciar Proceso",
    content: () => (
      <Icon appearance="gray" icon={<MdOutlineStart />} size="16px" />
    ),
  },
];

const breakPointsMock = [
  { breakpoint: "(min-width: 1091px)", totalColumns: 3 },
  { breakpoint: "(max-width: 850px)", totalColumns: 1 },
];

const entriesMock = [
  {
    id: "11",
    process: "CIERRE_CAJA",
    requirements: (
      <StyledContainerButton>
        <Button spacing="compact" appearance="success">
          Cumple
        </Button>
      </StyledContainerButton>
    ),
    executionDate: "2024/05/15",
  },
  {
    id: "12",
    process: "MIGRACION IPROCESS",
    requirements: (
      <StyledContainerButton>
        <Button spacing="compact" appearance="danger">
          No cumple
        </Button>
      </StyledContainerButton>
    ),

    executionDate: "2024/05/09",
  },
  {
    id: "13",
    process: "PROVISION",
    requirements: (
      <StyledContainerButton>
        <Button spacing="compact" appearance="danger">
          No cumple
        </Button>
      </StyledContainerButton>
    ),
    executionDate: "2024/05/11",
  },
  {
    id: "14",
    process: "CIERRE_CAJA",
    requirements: (
      <StyledContainerButton>
        <Button spacing="compact" appearance="warning">
          Sin evaluar
        </Button>
      </StyledContainerButton>
    ),
    executionDate: "2024/05/05",
  },
];

export { titlesMock, actionsMock, breakPointsMock, entriesMock };
