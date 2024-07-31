import { FormikValues } from "formik";
import { useMediaQuery } from "@inubekit/hooks";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { Button } from "@inubekit/button";
import { Fieldset } from "@inubekit/fieldset";
import { Textarea } from "@inubekit/textarea";
import { Select } from "@inubekit/select";

import { IEntries } from "@src/forms/types";
import { getDomainById } from "@mocks/domains/domainService.mocks";
import { Datetimefield } from "@src/design/inputs/Datetimefield";
import { tokens } from "@src/design/tokens";

import { StyledField, StyledTextarea } from "./styles";

interface RefreshCreditRequestUIProps {
  data: IEntries;
  formik: FormikValues;
  comparisonData: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onStartProcess: () => void;
}

const RefreshCreditRequestUI = (props: RefreshCreditRequestUIProps) => {
  const { data, formik, comparisonData, onChange, onStartProcess } = props;

  const getFieldState = (formik: FormikValues, fieldName: string) => {
    if (formik.errors[fieldName]) return "invalid";
  };

  const isMobile = useMediaQuery("(max-width: 500px)");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <Stack direction="column" gap={tokens.spacing.s250}>
        <StyledField>
          <Text type="label" size="large" weight="bold">
            Descripcion sugerida
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

        <Select
          id="typeRefresh"
          label="Tipo de refresco"
          name="typeRefresh"
          onChange={onChange}
          onBlur={formik.handleBlur}
          options={getDomainById("typeRefresh")}
          placeholder="Seleccione uno"
          size="wide"
          message={
            getFieldState(formik, "typeRefresh") === "invalid"
              ? "La tipo de refresco es requerido"
              : ""
          }
          status={getFieldState(formik, "typeRefresh")}
          value={formik.values.typeRefresh}
          fullwidth
          required
        />

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
            disabled={!comparisonData || !formik.isValid}
          >
            Iniciar proceso
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};

export { RefreshCreditRequestUI };
export type { RefreshCreditRequestUIProps };
