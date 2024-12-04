import { FormikValues } from "formik";
import { useMediaQuery } from "@inubekit/hooks";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { Button } from "@inubekit/button";
import { Fieldset } from "@inubekit/fieldset";
import { Textarea } from "@inubekit/textarea";
import { Divider } from "@inubekit/divider";

import { IEntries } from "@forms/types";
import { Datetimefield } from "@design/inputs/Datetimefield";
import { tokens } from "@design/tokens";
import { mediaQueryMobile } from "@config/environment";
import { getFieldState, validateExecutionWay } from "@forms/utils";
import { ComponentAppearance } from "@ptypes/aparences.types";
import {
  StyledContainerForm,
  StyledField,
  StyledTextarea,
} from "@forms/styles";
import { formatDate } from "@utils/dates";

interface RefreshInterestStatusUpdateUIProps {
  data: IEntries;
  formik: FormikValues;
  comparisonData: boolean;
  onStartProcess: () => void;
}

const RefreshInterestStatusUpdateUI = (
  props: RefreshInterestStatusUpdateUIProps
) => {
  const { data, formik, comparisonData, onStartProcess } = props;

  const isMobile = useMediaQuery(mediaQueryMobile);

  return (
    <Stack direction="column" gap={tokens.spacing.s250}>
      <Text type="title" size="medium" appearance="dark" weight="bold">
        Estado de interés
      </Text>
      <Divider dashed />
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <Stack
          direction="column"
          gap={tokens.spacing.s250}
          height={isMobile ? "410px" : "auto"}
        >
          <StyledContainerForm>
            <StyledField>
              <Text type="label" size="large" weight="bold">
                Descripción sugerida
              </Text>
              <Fieldset legend="" spacing="compact" type="title" size="medium">
                <Text>{String(data?.descriptionSuggested)}</Text>
              </Fieldset>
            </StyledField>

            <StyledTextarea>
              <Textarea
                label="Descripción complementaria"
                name="descriptionComplementary"
                id="descriptionComplementary"
                placeholder=""
                value={formik.values.descriptionComplementary}
                fullwidth
                maxLength={220}
                onChange={formik.handleChange}
              />
            </StyledTextarea>

            <StyledField $smallScreen={isMobile}>
              <Text type="label" size="large" weight="bold">
                Fecha y hora de ejecución
              </Text>
              <Fieldset legend="" spacing="compact" type="title" size="medium">
                <Text>{formatDate(new Date(data.date as string), true)}</Text>
              </Fieldset>
            </StyledField>

            {data?.executionWay &&
              validateExecutionWay(data?.executionWay as string) && (
                <Datetimefield
                  withFullwidth={true}
                  id="plannedExecutionDate"
                  label="Fecha planeada de ejecución"
                  message={
                    getFieldState(formik, "plannedExecutionDate") === "invalid"
                      ? "La fecha es requerida"
                      : ""
                  }
                  name="plannedExecutionDate"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  size="wide"
                  status={getFieldState(formik, "plannedExecutionDate")}
                  value={formik.values.plannedExecutionDate}
                  isRequired
                />
              )}
          </StyledContainerForm>
          <Stack gap={tokens.spacing.s100} justifyContent="flex-end">
            <Button
              spacing="wide"
              appearance={ComponentAppearance.PRIMARY}
              variant="filled"
              type="submit"
              onClick={onStartProcess}
              disabled={
                data?.executionWay &&
                data?.executionWay === "PlannedAutomaticExecution"
                  ? !comparisonData
                  : false
              }
            >
              Iniciar proceso
            </Button>
          </Stack>
        </Stack>
      </form>
    </Stack>
  );
};

export { RefreshInterestStatusUpdateUI };
export type { RefreshInterestStatusUpdateUIProps };
