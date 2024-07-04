import { Button } from "@inubekit/button";

import { StyledContainerButton } from "./styles";
import { StartProcesses } from "./types";
import { Tag } from "@inubekit/tag";

const orderData = (data: StartProcesses[], orderAscending: boolean) => {
  orderAscending
    ? data.sort((b, a) => a.executionDate.getTime() - b.executionDate.getTime())
    : data.sort(
        (a, b) => a.executionDate.getTime() - b.executionDate.getTime()
      );
};

const formatStatus = (status: string) => {
  if (status === "No cumple" ) {
    return <Tag label="Error" appearance="danger" weight="strong" />;
  }

  if (status === "Cumple") {
    return <Tag label="Sin Procesar" appearance="success" weight="strong" />;
  }

  if (status === "Sin evaluar") {
    return <Tag label="Sin Procesar" appearance="warning" weight="strong" />;
  }
};

const requirementsData = () => {
  const status = [
    { name: "Cumple", appearance: "success" },
    { name: "No cumple", appearance: "danger" },
    { name: "Sin evaluar", appearance: "warning" },
  ];
  const getRandomIndex = () => Math.floor(Math.random() * status.length);

  return status[getRandomIndex()];
};

const requirementsButton = () => {
  const status = requirementsData();
  return (
    <>
      <StyledContainerButton>
        <Button
          spacing="compact"
          appearance={
            status.appearance as
              | "success"
              | "danger"
              | "warning"
              | "primary"
              | "help"
              | "dark"
              | "gray"
              | "light"
              | undefined
          }
        >
          {status.name}
        </Button>
      </StyledContainerButton>
    </>
  );
};

export { orderData, requirementsData, requirementsButton, formatStatus };
