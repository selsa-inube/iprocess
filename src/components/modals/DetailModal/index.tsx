import { createPortal } from "react-dom";
import { MdClear } from "react-icons/md";
import { Fieldset } from "@inubekit/fieldset";
import { Label } from "@inubekit/label";
import { Button } from "@inubekit/button";
import { Divider } from "@inubekit/divider";
import { useMediaQuery } from "@inubekit/hooks";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { Blanket } from "@inubekit/blanket";

import { mediaQueryMobile } from "@src/config/environment";
import { StyledContainer, StyledModal, StyledModalFields } from "./styles";
import { IEntries, ILabel } from "./types";


interface DetailModalProps {
  portalId: string;
  title: string;
  data: IEntries;
  labels: ILabel[];
  onCloseModal: () => void;
}

const DetailModal = (props: DetailModalProps) => {
  const {
    portalId,
    title,
    data,
    labels,
    onCloseModal,
  } = props;

  const isMobile = useMediaQuery(mediaQueryMobile);

  const node = document.getElementById(portalId);

  const partOfLabels = labels.length - 1;

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
                    {title}
                  </Text>
                  <MdClear size={24} cursor="pointer" onClick={onCloseModal} />
                </Stack>
              </Stack>

              <Divider dashed />

              {labels.slice(0, partOfLabels).map(
                (field, id) =>
                  (
                    <StyledModalFields key={id} $smallScreen={isMobile}>
                      <Label
                        htmlFor={field.id}
                        size="small"
                        margin="0px 0px 0px 16px"
                      >
                        {field.titleName}
                      </Label>
                      <Fieldset legend="" spacing="compact">
                       <Text>{data[field.id]}</Text> 
                      </Fieldset>
                    </StyledModalFields>
                  )
              )}
              {labels.slice(partOfLabels).map(
                (field, id) =>
                  data[field.id] && (
                    <Stack key={id} gap="16px">
                      <Label
                        htmlFor={field.id}
                        size="small"
                        margin="0px 0px 0px 16px"
                      >
                        {field.titleName}
                      </Label>
                      <Stack>{data[field.id]}</Stack>
                    </Stack>
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
                Cerrar
              </Button>
            </Stack>
          </Stack>
        </StyledModal>
      </Blanket>
    </StyledContainer>,
    node
  );
};

export { DetailModal };
export type { DetailModalProps };
