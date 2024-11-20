import { FormikValues } from "formik";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { Button } from "@inubekit/button";
import { Fieldset } from "@inubekit/fieldset";
import { Textarea } from "@inubekit/textarea";
import { Select } from "@inubekit/select";
import { Divider } from "@inubekit/divider";
import { useMediaQuery } from "@inubekit/hooks";
import { Date as Datefield } from "@inubekit/date";

import { IEntries, IEnumeratorsProcessCoverage } from "@forms/types";
import { Datetimefield } from "@design/inputs/Datetimefield";
import { tokens } from "@design/tokens";
import { getFieldState, validateExecutionWay } from "@forms/utils";
import { ComponentAppearance } from "@ptypes/aparences.types";
import {
  StyledField,
  StyledTextarea,
  StyledContainerForm,
} from "@forms/styles";
import { mediaQueryMobile } from "@config/environment";
import { formatDateEndpoint } from "@utils/dates";

interface RefreshSavingProductUIProps {
  data: IEntries;
  formik: FormikValues;
  comparisonData: boolean;
  optionsTypeRefresh: IEnumeratorsProcessCoverage[];
  onChange: (name: string, value: string) => void;
  onStartProcess: () => void;
}

const RefreshSavingProductUI = (props: RefreshSavingProductUIProps) => {
  const {
    data,
    formik,
    comparisonData,
    optionsTypeRefresh,
    onChange,
    onStartProcess,
  } = props;

  const isMobile = useMediaQuery(mediaQueryMobile);

  return (
    <Stack direction="column" gap={tokens.spacing.s250}>
      <Text type="title" size="medium" appearance="dark" weight="bold">
        Productos de ahorro
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
              invalid={
                getFieldState(formik, "typeRefresh") === "invalid" &&
                formik.errors.typeRefresh
              }
              value={formik.values.typeRefresh}
              fullwidth
              required
            />

            <Datefield
              disabled={false}
              fullwidth={true}
              id="cutOffDate"
              label="Fecha de corte para la ejecución"
              name="cutOffDate"
              message={
                getFieldState(formik, "cutOffDate") === "invalid"
                  ? "La fecha de corte es requerida"
                  : ""
              }
              onBlur={formik.handleBlur}
              onFocus={formik.handleFocus}
              onChange={formik.handleChange}
              required={false}
              size="wide"
              status={getFieldState(formik, "cutOffDate")}
              value={
                formik.values.cutOffDate ||
                formatDateEndpoint(new Date(data.date as Date))
              }
            />

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
              disabled={!comparisonData || !formik.isValid}
            >
              Iniciar proceso
            </Button>
          </Stack>
        </Stack>
      </form>
    </Stack>
  );
};

export { RefreshSavingProductUI };
export type { RefreshSavingProductUIProps };
