import { MdClear } from "react-icons/md";
import { createPortal } from "react-dom";

import { Button } from "@inubekit/button";
import { Divider } from "@inubekit/divider";
import { useMediaQuery } from "@inubekit/hooks";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { Blanket } from "@inubekit/blanket";
import { Label } from "@inubekit/label";
import { Fieldset } from "@inubekit/fieldset";
import { Textarea } from "@inubekit/textarea";

import { IEntries, ILabel } from "../MoreDetailsModal/types";
import {
  StyledContainer,
  StyledModal,
  StyledModalFields,
  StyledTextarea,
} from "./styles";

import { FormikValues } from "formik";

interface StartProcessModalUIProps {
  data: IEntries;
  formik: FormikValues;
  labels: ILabel[];
  portalId: string;
  onCloseModal: () => void;
  handleStartProcess: () => void;
}

const StartProcessModalUI = (props: StartProcessModalUIProps) => {
  const { data, formik, labels, portalId, onCloseModal, handleStartProcess } =
    props;

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
                    Iniciar Proceso
                  </Text>
                  <MdClear size={24} cursor="pointer" onClick={onCloseModal} />
                </Stack>
              </Stack>

              <Divider dashed />

              {labels.slice(0, 1).map(
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
                      <Fieldset legend="" spacing="compact">
                        <Text>{data[field.id]}</Text>
                      </Fieldset>
                    </StyledModalFields>
                  )
              )}
              {labels.slice(1, 2).map((field, id) => (
                <StyledTextarea key={id}>
                  <Textarea
                    label={field.titleName}
                    name="descriptionComplementary"
                    id="descriptionComplementary"
                    placeholder=""
                    value={formik.values.descriptionComplementary}
                    message={formik.errors.descriptionComplementary}
                    fullwidth
                    maxLength={220}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  />
                </StyledTextarea>
              ))}
              {labels.slice(2).map(
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
                      <Fieldset legend="" spacing="compact">
                        <Text>{data[field.id]}</Text>
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
                onClick={handleStartProcess}
              >
                Iniciar proceso
              </Button>
            </Stack>
          </Stack>
        </StyledModal>
      </Blanket>
    </StyledContainer>,
    node
  );
};

export { StartProcessModalUI };
export type { StartProcessModalUIProps };
