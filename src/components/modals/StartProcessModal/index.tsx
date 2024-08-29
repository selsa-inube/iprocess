import { MdClear } from "react-icons/md";
import { createPortal } from "react-dom";

import { Divider } from "@inubekit/divider";
import { useMediaQuery } from "@inubekit/hooks";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { Blanket } from "@inubekit/blanket";
import { tokens } from "@design/tokens";
import { mediaQueryMobile } from "@config/environment";
import {
  StyledContainer,
  StyledModal,
} from "./styles";


interface StartProcessModalProps {
  children: React.ReactNode;
  portalId: string;
  onCloseModal: () => void;
}

const StartProcessModal = (props: StartProcessModalProps) => {
  const { children, portalId, onCloseModal } =
    props;

  const isMobile = useMediaQuery(mediaQueryMobile);

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
          <Stack direction="column" gap={tokens.spacing.s250}>
            <Stack direction="column" gap={tokens.spacing.s200}>
              <Stack direction="column" gap={tokens.spacing.s100}>
                <Stack alignItems="center" justifyContent="space-between">
                  <Text type="title" size="medium" appearance="dark">
                    Iniciar Proceso
                  </Text>
                  <MdClear size="24px" cursor="pointer" onClick={onCloseModal} />
                </Stack>
              </Stack>

              <Divider dashed />

             {children}
            </Stack>
          </Stack>
        </StyledModal>
      </Blanket>
    </StyledContainer>,
    node
  );
};

export { StartProcessModal };
export type { StartProcessModalProps };
