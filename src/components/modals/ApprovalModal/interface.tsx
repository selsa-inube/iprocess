import { MdClear } from "react-icons/md";
import { createPortal } from "react-dom";
import { FormikValues } from "formik";

import {
  useMediaQuery,
  Stack,
  Text,
  Divider,
  Blanket,
  Label,
  Button,
  Textarea,
  Toggle,
} from "@inubekit/inubekit";

import {
  StyledContainer,
  StyledModal,
  StyledTextarea,
  StyledToggle,
} from "./styles";

interface ApprovalModalUIProps {
  dataComparison: boolean;
  formik: FormikValues;
  loading: boolean;
  portalId: string;
  approvalChecked: boolean;
  onCloseModal: () => void;
  handleConfirm: () => void;
}

const ApprovalModalUI = (props: ApprovalModalUIProps) => {
  const {
    approvalChecked,
    dataComparison,
    formik,
    loading,
    portalId,
    handleConfirm,
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

              <StyledToggle>
                <Toggle
                  checked={approvalChecked}
                  id="approval"
                  margin="0px"
                  name="approval"
                  onChange={() => {}}
                  padding="0px"
                  size="large"
                  value={"approval"}
                />
                <Label htmlFor="approval" size="large">
                  Aprobado
                </Label>
              </StyledToggle>
              <StyledTextarea $smallScreen={isMobile}>
                <Textarea
                  label="Observaciones de aprobación"
                  name="observation"
                  id="observation"
                  placeholder="Indique la razón por la que el requisito cumple"
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
                disabled={!dataComparison}
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
