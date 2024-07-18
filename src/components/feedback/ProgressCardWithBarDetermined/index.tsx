import { createPortal } from "react-dom";
import { Button } from "@inubekit/button";
import { useMediaQuery } from "@inubekit/hooks";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { Blanket } from "@inubekit/blanket";

import { StyledContainer, StyledModal } from "./styles";
import { ProgressBar } from "../ProgressBar";

interface ProgressCardWithBarDeterminedProps {
  estime: number;
  progress: number;
  portalId: string;
  buttonClose?: boolean;
  heightProgressBar?: string;
  appearance?:
    | "primary"
    | "success"
    | "warning"
    | "danger"
    | "help"
    | "dark"
    | "gray"
    | "light";
  handleCancel?: () => void;
}

const ProgressCardWithBarDetermined = (props: ProgressCardWithBarDeterminedProps) => {
  const {
    buttonClose = false,
    estime,
    progress,
    portalId,
    heightProgressBar = "15px",
    appearance,
    handleCancel,
  } = props;

  const isMobile = useMediaQuery("(max-width: 500px)");

  const node = document.getElementById(portalId);

  if (!node) {
    throw new Error(
      "The portal node is not defined. This can occur when the specific node used to render the portal has not been defined correctly."
    );
  }

  return createPortal(
    <StyledContainer>
      <Blanket>
        <StyledModal $smallScreen={isMobile}>
          <Stack direction="column" gap="40px">
            <Stack direction="column" gap="20px">
              <Text type="body" size="medium" appearance="dark">
                Este proceso tomará algo de tiempo, por favor espere hasta que
                se complete.
              </Text>

              <Stack direction="column" alignItems="center">
                <Text type="body" size="medium" appearance="dark">
                  Tiempo Estimado: {estime} Segundos
                </Text>
              </Stack>
              <Stack direction="column">
                <Stack direction="column" alignItems="center">
                  <Text type="body" size="large" appearance="dark">
                    {progress.toFixed(0)}%
                  </Text>
                </Stack>
                <ProgressBar
                  progress={progress}
                  height={heightProgressBar}
                  appearance={appearance}
                  animated
                  onProgress={() => {}}
                />
              </Stack>
            </Stack>
            {buttonClose && (
              <Stack gap="8px" justifyContent="flex-end">
                <Button
                  spacing="wide"
                  appearance="primary"
                  variant="filled"
                  onClick={handleCancel}
                  disabled={progress !== 100}
                >
                  Cerrar
                </Button>
              </Stack>
            )}
          </Stack>
        </StyledModal>
      </Blanket>
    </StyledContainer>,
    node
  );
};

export { ProgressCardWithBarDetermined };
export type { ProgressCardWithBarDeterminedProps };
