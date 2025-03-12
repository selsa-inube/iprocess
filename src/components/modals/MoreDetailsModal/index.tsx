import { MdClear } from "react-icons/md";
import { createPortal } from "react-dom";

import {
  useMediaQuery,
  Stack,
  Text,
  Divider,
  Blanket,
  Fieldset,
  Label,
  Button,
} from "@inubekit/inubekit";

import { mediaQueryMobile } from "@config/environment";
import { StyledContainer, StyledModal, StyledModalFields } from "./styles";
import { IEntries, ILabel } from "./types";

interface MoreDetailsModalProps {
  data: IEntries;
  labels: ILabel[];
  portalId: string;
  onCloseModal: () => void;
}

const MoreDetailsModal = (props: MoreDetailsModalProps) => {
  const { data, labels, portalId, onCloseModal } = props;

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
          <Stack direction="column" gap="20px">
            <Stack direction="column" gap="16px">
              <Stack direction="column" gap="8px">
                <Stack alignItems="center" justifyContent="space-between">
                  <Text type="title" size="medium" appearance="dark">
                    Más detalles
                  </Text>
                  <MdClear size={24} cursor="pointer" onClick={onCloseModal} />
                </Stack>
              </Stack>

              <Divider dashed />

              {labels.map(
                (field, id) =>
                  data[field.id] && (
                    <StyledModalFields key={id} $smallScreen={isMobile}>
                      <Label
                        htmlFor={field.id}
                        size="large"
                        margin="0px 0px 0px 16px"
                      >
                        {field.titleName}
                      </Label>
                      <Fieldset
                        legend=""
                        spacing="compact"
                        type="title"
                        size="medium"
                      >
                        <Text>{String(data[field.id])}</Text>
                      </Fieldset>
                    </StyledModalFields>
                  )
              )}
            </Stack>
            <Stack gap="8px" justifyContent="flex-end">
              <Button
                spacing="wide"
                appearance="primary"
                variant="filled"
                onClick={onCloseModal}
              >
                cancelar
              </Button>
            </Stack>
          </Stack>
        </StyledModal>
      </Blanket>
    </StyledContainer>,
    node
  );
};

export { MoreDetailsModal };
export type { MoreDetailsModalProps };
