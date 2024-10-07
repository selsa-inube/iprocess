import { MdClear } from "react-icons/md";
import { createPortal } from "react-dom";
import { FormikValues } from "formik";

import { Button } from "@inubekit/button";
import { Divider } from "@inubekit/divider";
import { useMediaQuery } from "@inubekit/hooks";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { Blanket } from "@inubekit/blanket";
import { Textarea } from "@inubekit/textarea";
import { Toggle } from "@inubekit/toggle";

import { StyledContainer, StyledModal, StyledTextarea } from "./styles";
import { Label } from "@inubekit/label";

interface ApprovalModalUIProps {
  dataComparison: boolean;
  formik: FormikValues;
  loading: boolean;
  portalId: string;
  approvalChecked: boolean;
  onCloseModal: () => void;
  handleConfirm: () => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ApprovalModalUI = (props: ApprovalModalUIProps) => {
  const {
    approvalChecked,
    dataComparison,
    formik,
    loading,
    portalId,
    handleConfirm,
    handleChange,
    onCloseModal,
  } = props;

  const getFieldState = (formik: FormikValues, fieldName: string) => {
    if (formik.errors[fieldName]) return "invalid";
  };

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
                    Aprobaciones
                  </Text>
                  <MdClear size={24} cursor="pointer" onClick={onCloseModal} />
                </Stack>
              </Stack>

              <Divider dashed />

              <Label htmlFor="approval" size="medium" />

              <Toggle
                checked={approvalChecked}
                id="approval"
                margin="0px"
                name="approval"
                onChange={handleChange}
                padding="0px"
                size="large"
                value={formik.values.approval}
              />

              <StyledTextarea $smallScreen={isMobile}>
                <Textarea
                  label="Observaciones de aprobación o rechazo"
                  name="observation"
                  id="observation"
                  placeholder="Indique la razón por la que cumple o no"
                  value={formik.values.observation}
                  message={formik.errors.observation}
                  fullwidth
                  maxLength={120}
                  status={getFieldState(formik, "observation")}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
              </StyledTextarea>
            </Stack>
            <Stack gap="8px" justifyContent="flex-end">
              <Button
                spacing="wide"
                appearance="primary"
                variant="filled"
                loading={loading}
                disabled={!dataComparison || !formik.isValid}
                onClick={handleConfirm}
              >
                Confirmar
              </Button>
            </Stack>
          </Stack>
        </StyledModal>
      </Blanket>
    </StyledContainer>,
    node
  );
};

export { ApprovalModalUI };
export type { ApprovalModalUIProps };
