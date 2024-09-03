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

import { StyledField, StyledTextarea } from "./styles";


interface RefreshInterestStatusUpdateUIProps {
  data: IEntries;
  formik: FormikValues;
  comparisonData: boolean;
  onStartProcess: () => void;
}

const RefreshInterestStatusUpdateUI = (props: RefreshInterestStatusUpdateUIProps) => {
  const { data, formik, comparisonData, onStartProcess } = props;

  const getFieldState = (formik: FormikValues, fieldName: string) => {
    if (formik.errors[fieldName]) return "invalid";
  };

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
      <Stack direction="column" gap={tokens.spacing.s250}>
        <StyledField>
          <Text type="label" size="large" weight="bold">
            Descripción sugerida
          </Text>
          <Fieldset legend="" spacing="compact">
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
          <Fieldset legend="" spacing="compact">
            <Text>{String(data.date)}</Text>
          </Fieldset>
        </StyledField>

        {data?.plannedAutomaticExecution &&
          data?.plannedAutomaticExecution === "planned automatic execution" && (
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

        <Stack gap={tokens.spacing.s100} justifyContent="flex-end">
          <Button
            spacing="wide"
            appearance="primary"
            variant="filled"
            type="submit"
            onClick={onStartProcess}
            disabled={data?.plannedAutomaticExecution &&
              data?.plannedAutomaticExecution === "planned automatic execution" ? !comparisonData : false }
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
