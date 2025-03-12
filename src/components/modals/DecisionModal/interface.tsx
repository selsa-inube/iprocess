import { MdClear } from "react-icons/md";
import { createPortal } from "react-dom";
import { FormikValues } from "formik";
import {
  useMediaQuery,
  Stack,
  Text,
  Icon,
  Blanket,
  Button,
  Textarea,
} from "@inubekit/inubekit";
import { tokens } from "@design/tokens";

import { appearances } from "@pages/startProcess/types";
import { mediaQueryMobile } from "@config/environment";
import { StyledModal, StyledTextarea } from "./styles";

interface DecisionModalUIProps {
  actionText: string;
  appearance: appearances;
  comparisonData: boolean;
  description: string;
  formik: FormikValues;
  isLoading: boolean;
  justificationOfDecision: boolean;
  portalId: string;
  title: string;
  onClick: () => void;
  onCloseModal: () => void;
}

const DecisionModalUI = (props: DecisionModalUIProps) => {
  const {
    actionText,
    appearance,
    comparisonData,
    description,
    formik,
    isLoading,
    justificationOfDecision,
    portalId,
    title,
    onCloseModal,
    onClick,
  } = props;

  const isMobile = useMediaQuery(mediaQueryMobile);

  const getFieldState = (formik: FormikValues, fieldName: string) => {
    if (formik.errors[fieldName]) return "invalid";
  };

  const node = document.getElementById(portalId);

  if (!node) {
    throw new Error(
      "The portal node is not defined. This can occur when the specific node used to render the portal has not been defined correctly."
    );
  }

  return createPortal(
    <Blanket>
      <StyledModal $smallScreen={isMobile}>
        <Stack alignItems="center" justifyContent="space-between">
          <Text type="title" size="medium" appearance="dark">
            {title}
          </Text>
          <Icon
            icon={<MdClear />}
            appearance="dark"
            size="24px"
            onClick={onCloseModal}
            cursorHover
          />
        </Stack>
        <Text appearance="gray" type="body" size="medium">
          {description}
        </Text>

        {justificationOfDecision && (
          <StyledTextarea $smallScreen={isMobile}>
            <Textarea
              label=""
              name="justification"
              id="justification"
              placeholder="Indique la razón por la que desea realizar esta acción"
              value={formik.values.justification}
              message={formik.errors.justification}
              fullwidth
              maxLength={130}
              status={getFieldState(formik, "justification")}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
          </StyledTextarea>
        )}

        <Stack gap={tokens.spacing.s100} justifyContent="flex-end">
          <Button
            spacing="wide"
            appearance="gray"
            variant="filled"
            onClick={onCloseModal}
          >
            Cancelar
          </Button>
          <Button
            spacing="wide"
            appearance={appearance}
            variant="filled"
            loading={isLoading}
            onClick={onClick}
            disabled={comparisonData || !formik.isValid}
          >
            {actionText}
          </Button>
        </Stack>
      </StyledModal>
    </Blanket>,
    node
  );
};

export { DecisionModalUI };
export type { DecisionModalUIProps };
