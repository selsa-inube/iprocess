import { MdClear } from "react-icons/md";
import { createPortal } from "react-dom";
import { FormikValues } from "formik";

import { Button } from "@inubekit/button";
import { Divider } from "@inubekit/divider";
import { useMediaQuery } from "@inubekit/hooks";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { Blanket } from "@inubekit/blanket";

import { MonthPicker } from "@components/feedback/MonthPicker";
import { YearPicker } from "@components/feedback/YearPicker";
import { StyledContainer, StyledModal } from "./styles";


interface ChangePeriodModalUIProps {
  disabledButton:boolean;
  formik: FormikValues;
  laterYears: number;
  previousYears: number;
  portalId: string;
  selectedMonth: string;
  selectedYear: string;
  onCloseModal: () => void;
  handleConsult: () => void;
}

const ChangePeriodModalUI = (props: ChangePeriodModalUIProps) => {
  const {
    disabledButton,
    formik,
    laterYears,
    selectedMonth,
  selectedYear,
    previousYears,
    portalId,
    handleConsult,
    onCloseModal,
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
          <Stack direction="column" gap="20px">
            <Stack direction="column" gap="16px">
              <Stack direction="column" gap="8px">
                <Stack alignItems="center" justifyContent="space-between">
                  <Text type="title" size="medium" appearance="dark">
                    Seleccione el mes y el año
                  </Text>
                  <MdClear size={24} cursor="pointer" onClick={onCloseModal} />
                </Stack>
              </Stack>

              <Divider dashed />

              <MonthPicker formik={formik} selectedMonth={selectedMonth}/>

              <YearPicker
                formik={formik}
                laterYears={laterYears}
                previousYears={previousYears}
                selectedYear={selectedYear}
              />
            </Stack>
            <Stack gap="8px" justifyContent="flex-end">
              <Button
                spacing="wide"
                appearance="light"
                variant="filled"
                onClick={onCloseModal}
              >
                Cancelar
              </Button>
            
              <Button
                spacing="wide"
                appearance="primary"
                variant="filled"
                disabled={!disabledButton || !formik.isValid}
                onClick={handleConsult}
              >
                Consultar
              </Button>
            </Stack>
          </Stack>
        </StyledModal>
      </Blanket>
    </StyledContainer>,
    node
  );
};

export { ChangePeriodModalUI };
export type { ChangePeriodModalUIProps };
