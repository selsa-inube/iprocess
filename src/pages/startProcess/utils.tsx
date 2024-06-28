import { Button } from "@inubekit/button";

import { StyledContainerButton } from "./styles";
import { StartProcesses } from "./types";

const orderData = (data: StartProcesses[], orderAscending: boolean) => {
  orderAscending
    ? data.sort((b, a) => a.executionDate.getTime() - b.executionDate.getTime())
    : data.sort(
        (a, b) => a.executionDate.getTime() - b.executionDate.getTime()
      );
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

export { orderData, requirementsData, requirementsButton };
