import { MdClear } from "react-icons/md";
import { createPortal } from "react-dom";

import { Button } from "@inubekit/button";
import { Divider } from "@inubekit/divider";
import { useMediaQuery } from "@inubekit/hooks";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { Blanket } from "@inubekit/blanket";
import { StyledContainer, StyledModal } from "./styles";
import { CountdownBar } from "@inubekit/countdownbar";

interface ProcessingModalProps {
  portalId: string;
  onCloseModal: () => void;
  handleCancel: () => void;
}

const ProcessingModal = (props: ProcessingModalProps) => {
  const { portalId, handleCancel, onCloseModal } = props;

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
          <Stack direction="column" gap="20px">
            <Stack direction="column" gap="16px">
              <Stack direction="column" gap="8px">
                <Stack alignItems="center" justifyContent="space-between">
                  <Text type="title" size="medium" appearance="dark">
                    Procesando
                  </Text>
                  <MdClear size={24} cursor="pointer" onClick={onCloseModal} />
                </Stack>
              </Stack>

              <Divider dashed />
              <CountdownBar
                height="4px"
                appearance="primary"
                duration={3000}
                paused={false}
                onCountdown={ onCloseModal}
              />
              <Text type="body" size="large" appearance="dark">
                Este proceso tomará algo de tiempo, por favor espere hasta que
                se complete. En cualquier momento puede cancelar, pero tenga en
                cuenta que el proceso no se guardará.
              </Text>
            </Stack>
            <Stack gap="8px" justifyContent="flex-end">
              <Button
                spacing="wide"
                appearance="primary"
                variant="filled"
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </Stack>
          </Stack>
        </StyledModal>
      </Blanket>
    </StyledContainer>,
    node
  );
};

export { ProcessingModal };
export type { ProcessingModalProps };
