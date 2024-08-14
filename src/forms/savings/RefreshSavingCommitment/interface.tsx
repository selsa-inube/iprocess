import { FormikValues } from "formik";
import { useMediaQuery } from "@inubekit/hooks";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { Button } from "@inubekit/button";
import { Fieldset } from "@inubekit/fieldset";
import { Textarea } from "@inubekit/textarea";
import { Select } from "@inubekit/select";

import { IEntries, IEnumeratorsProcessCoverage } from "@src/forms/types";
import { Datetimefield } from "@src/design/inputs/Datetimefield";
import { tokens } from "@src/design/tokens";
import { mediaQueryMobile } from "@src/config/environment";
import { StyledField, StyledTextarea } from "./styles";


interface RefreshSavingCommitmentUIProps {
  data: IEntries;
  formik: FormikValues;
  comparisonData: boolean;
  optionsTypeRefresh: IEnumeratorsProcessCoverage[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onStartProcess: () => void;
}

const RefreshSavingCommitmentUI = (props: RefreshSavingCommitmentUIProps) => {
  const { data, formik, comparisonData, optionsTypeRefresh, onChange, onStartProcess } = props;

  const getFieldState = (formik: FormikValues, fieldName: string) => {
    if (formik.errors[fieldName]) return "invalid";
  };

  const isMobile = useMediaQuery(mediaQueryMobile);

  return (
    <form>
      <Stack direction="column" gap={tokens.spacing.s250}>
        <StyledField>
          <Text type="label" size="large">
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
            message={formik.errors.descriptionComplementary}
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
            options={optionsTypeRefresh}
            placeholder="Seleccione uno"
            size="wide"
            message={
              getFieldState(formik, "typeRefresh") === "invalid"
                ? "La tipo de refresco es requerido"
                : ""
            }
            status={getFieldState(formik, "typeRefresh")}
            value={formik.values.typeRefresh}
            fullwidth={true}
            required
          />

        <StyledField $smallScreen={isMobile}>
          <Text type="label" size="large">
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

export { RefreshSavingCommitmentUI };
export type { RefreshSavingCommitmentUIProps };