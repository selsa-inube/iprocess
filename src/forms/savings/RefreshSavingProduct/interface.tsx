import { useMediaQuery } from "@inubekit/hooks";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";

import { Fieldset } from "@inubekit/fieldset";
import { Textarea } from "@inubekit/textarea";
import { FormikValues } from "formik";
import { StyledContentSelect, StyledField, StyledTextarea } from "./styles";
import { IEntries } from "@src/forms/types";
import { Select } from "@inubekit/select";
import { getDomainById } from "@src/mocks/domains/domainService.mocks";
import { Datetimefield } from "@src/design/inputs/Datetimefield";
import { Button } from "@inubekit/button";
import { tokens } from "@src/design/tokens";

interface RefreshSavingProductUIProps {
  data: IEntries;
  formik: FormikValues;
  comparisonData: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onStartProcess: () => void;
}

const RefreshSavingProductUI = (props: RefreshSavingProductUIProps) => {
  const { data, formik, comparisonData, onChange, onStartProcess } = props;

  const getFieldState = (formik: FormikValues, fieldName: string) => {
    if (formik.errors[fieldName]) return "invalid";
  };

  const isMobile = useMediaQuery("(max-width: 500px)");

  return (
    <form>
      <Stack direction="column" gap={tokens.spacing.s250}>
        <StyledField>
          <Text type="label" size="large">
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
            message={formik.errors.descriptionComplementary}
            fullwidth
            maxLength={220}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
        </StyledTextarea>

        <StyledContentSelect>
          <Select
            id="typeRefresh"
            label="Tipo de refresco"
            name="typeRefresh"
            onChange={onChange}
            onBlur={formik.handleBlur}
            options={getDomainById("typeRefresh")}
            placeholder="Seleccione uno"
            size="wide"
            status={getFieldState(formik, "typeRefresh")}
            value={formik.values.typeRefresh}
            fullwidth={true}
            required
          />
        </StyledContentSelect>

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
              message={"Campo requerido"}
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

export { RefreshSavingProductUI };
export type { RefreshSavingProductUIProps };
