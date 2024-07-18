import { createPortal } from "react-dom";

import { Button } from "@inubekit/button";
import { useMediaQuery } from "@inubekit/hooks";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { Blanket } from "@inubekit/blanket";
import { Spinner } from "@inubekit/spinner";

import { StyledContainer, StyledModal } from "./styles";

interface ProgressCardWithBarIndeterminedProps {
  portalId: string;
  appearance?:
    | "primary"
    | "success"
    | "warning"
    | "danger"
    | "help"
    | "dark"
    | "gray"
    | "light";
  withButtonClose?: boolean;
  disabledButton?: boolean;
  handleCancel?: () => void;
}

const ProgressCardWithBarIndetermined = (props: ProgressCardWithBarIndeterminedProps) => {
  const {
    portalId,
    appearance = "primary",
    withButtonClose,
    disabledButton,
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
                <Spinner
                  size="large"
                  appearance={appearance}
                  transparent={false}
                />
              </Stack>
            </Stack>

            {withButtonClose && (
              <Stack gap="8px" justifyContent="flex-end">
                <Button
                  spacing="wide"
                  appearance="primary"
                  variant="filled"
                  onClick={handleCancel}
                  disabled={disabledButton}
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
