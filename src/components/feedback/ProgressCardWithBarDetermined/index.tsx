import { createPortal } from "react-dom";
import { Button } from "@inubekit/button";
import { useMediaQuery } from "@inubekit/hooks";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { Blanket } from "@inubekit/blanket";

import { tokens } from "@design/tokens";
import { StyledContainer, StyledModal } from "./styles";
import { ProgressBar } from "../../../design/feedback/ProgressBar";
import { ProgressCardWithBarType } from "./types";

interface ProgressCardWithBarDeterminedProps {
  estime: number;
  progress: number;
  portalId: string;
  withButtonClose?: boolean;
  heightProgressBar?: string;
  appearance?: ProgressCardWithBarType;
  onCancel?: () => void;
}

const ProgressCardWithBarDetermined = (
  props: ProgressCardWithBarDeterminedProps
) => {
  const {
    withButtonClose = false,
    estime,
    progress,
    portalId,
    heightProgressBar = tokens.spacing.s200,
    appearance,
    onCancel,
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
        <StyledModal $withSmallScreen={isMobile}>
          <Stack direction="column" gap={tokens.spacing.s500}>
            <Stack direction="column" gap={tokens.spacing.s250}>
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
                  withAnimated
                  onProgress={() => true}
                />
              </Stack>
            </Stack>
            {withButtonClose && (
              <Stack gap={tokens.spacing.s100} justifyContent="flex-end">
                <Button
                  spacing="wide"
                  appearance="primary"
                  variant="filled"
                  onClick={onCancel}
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
