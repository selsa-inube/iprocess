import { FormikValues } from "formik";
import { useMediaQuery, Stack, Text } from "@inubekit/inubekit";
import { Button } from "@inubekit/button";
import { Fieldset } from "@inubekit/fieldset";
import { Textarea } from "@inubekit/textarea";
import { Select } from "@inubekit/select";
import { Divider } from "@inubekit/divider";
import { Date as Datefield } from "@inubekit/date";

import { IEntries, IEnumeratorsProcessCoverage } from "@forms/types";
import { Datetimefield } from "@design/inputs/Datetimefield";
import { tokens } from "@design/tokens";
import { getFieldState, validateExecutionWay } from "@forms/utils";
import { ComponentAppearance } from "@ptypes/aparences.types";
import {
  StyledContainerForm,
  StyledField,
  StyledTextarea,
} from "@forms/styles";
import { mediaQueryMobile } from "@config/environment";
import { formatDateEndpoint } from "@utils/dates";
import { getDomainById } from "@mocks/domains/domainService.mocks";

interface RefreshSavingCommitmentUIProps {
  data: IEntries;
  formik: FormikValues;
  comparisonData: boolean;
  onChange: (name: string, value: string) => void;
  onStartProcess: () => void;
  optionsTypeRefresh?: IEnumeratorsProcessCoverage[];
}

const RefreshSavingCommitmentUI = (props: RefreshSavingCommitmentUIProps) => {
  const {
    data,
    formik,
    comparisonData,
    onChange,
    onStartProcess,
  } = props;

  const isMobile = useMediaQuery(mediaQueryMobile);

  return (
    <Stack direction="column" gap={tokens.spacing.s250}>
      <Text type="title" size="medium" appearance="dark" weight="bold">
        Compromiso de ahorro
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
              <Text type="label" size="large">
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
              options={getDomainById("typeRefresh")}
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
              onClick={onStartProcess}
              type="submit"
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

export { RefreshSavingCommitmentUI };
export type { RefreshSavingCommitmentUIProps };
