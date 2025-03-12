import { createPortal } from "react-dom";

import {
  useMediaQuery,
  Stack,
  Text,
  Blanket,
  Spinner,
  Button,
} from "@inubekit/inubekit";
import { tokens } from "@design/tokens";
import { ComponentAppearance } from "@ptypes/aparences.types";

import { StyledContainer, StyledModal } from "./styles";
import { ProgressCardWithBarType } from "../ProgressCardWithBarDetermined/types";

interface ProgressCardWithBarIndeterminedProps {
  portalId: string;
  appearance?: ProgressCardWithBarType;
  withButtonClose?: boolean;
  isProcessCompleted?: boolean;
  onCancel?: () => void;
}

const ProgressCardWithBarIndetermined = (
  props: ProgressCardWithBarIndeterminedProps
) => {
  const {
    portalId,
    appearance = ComponentAppearance.PRIMARY,
    withButtonClose,
    isProcessCompleted,
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
                <Spinner
                  size="large"
                  appearance={appearance}
                  transparent={false}
                />
              </Stack>
            </Stack>

            {withButtonClose && (
              <Stack gap={tokens.spacing.s100} justifyContent="flex-end">
                <Button
                  spacing="wide"
                  appearance={ComponentAppearance.PRIMARY}
                  variant="filled"
                  onClick={onCancel}
                  disabled={!isProcessCompleted}
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

export { ProgressCardWithBarIndetermined };
export type { ProgressCardWithBarIndeterminedProps };
