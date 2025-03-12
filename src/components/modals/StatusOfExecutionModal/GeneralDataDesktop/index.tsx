import { lazy, Suspense } from "react";
import {
  Stack,
  Text,
  Grid,
  Divider,
  Toggle,
  Fieldset,
  Label,
  Input,
} from "@inubekit/inubekit";

import { tokens } from "@design/tokens";
import { StartProcesses } from "@pages/startProcess/types";
import { CardStatusExecution } from "@components/feedback/CardStatusExecution";
import { StyledFields } from "../styles";
import { ILabel } from "../types";

interface GeneralDataDesktopProps {
  dataInformationProcess: StartProcesses;
  labels: ILabel[];
  processControlId: string;
  search: string;
  seeErrorsChecked: boolean;
  onChangeSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeToggle: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const GeneralDataDesktop = (props: GeneralDataDesktopProps) => {
  const {
    dataInformationProcess,
    labels,
    processControlId,
    search,
    seeErrorsChecked,
    onChangeSearch,
    onChangeToggle,
  } = props;

  const CardStatusExecutionGroupComponent = lazy(() =>
    import("@components/feedback/CardStatusExecutionGroup").then((module) => ({
      default: module.CardStatusExecutionGroup,
    }))
  );

  return (
    <>
      <Grid
        templateColumns="1fr 1fr 1fr"
        templateRows="1fr 1fr"
        gap={tokens.spacing.s100}
      >
        {labels.map((field, id) => {
          const value =
            dataInformationProcess[field.id as keyof StartProcesses];
          return value !== null &&
            value !== undefined &&
            (typeof value === "string" || typeof value === "number") ? (
            <StyledFields key={id}>
              <Label
                htmlFor={field.id}
                size="large"
                margin={`${tokens.spacing.s0} ${tokens.spacing.s0} ${tokens.spacing.s0} ${tokens.spacing.s200}`}
              >
                {field.titleName}
              </Label>
              <Fieldset legend="" spacing="compact" type="title" size="medium">
                <Text type="body" size="medium">
                  {value}
                </Text>
              </Fieldset>
            </StyledFields>
          ) : null;
        })}
      </Grid>
      <Divider dashed />

      <Grid templateColumns="2fr 1fr 1fr" alignItems="center" height="40px">
        <Text type="title" size="medium" appearance="dark" weight="bold">
          Personas incluidas en el proceso
        </Text>

        <Stack
          direction="row"
          gap={tokens.spacing.s100}
          justifyContent="center"
          alignItems="center"
          alignContent="center"
        >
          <Toggle
            checked={seeErrorsChecked}
            id="seeErrors"
            margin={tokens.spacing.s0}
            name="seeErrors"
            onChange={onChangeToggle}
            padding={tokens.spacing.s0}
            value={"seeErrors"}
            size="small"
          />
          <Label htmlFor="seeErrors" size="medium">
            Ver errores
          </Label>
        </Stack>
        <Input
          placeholder="Palabra clave..."
          type="search"
          name="search"
          id="search"
          value={search}
          onChange={onChangeSearch}
          size="compact"
        />
      </Grid>
      <Suspense
        fallback={
          <Stack
            gap={tokens.spacing.s200}
            width="100%"
            wrap="wrap"
            height="372px"
          >
            <CardStatusExecution isLoading={true} />
            <CardStatusExecution isLoading={true} />
            <CardStatusExecution isLoading={true} />
          </Stack>
        }
      >
        <CardStatusExecutionGroupComponent
          processControlId={processControlId}
          filter={search}
          filteredWithErrors={seeErrorsChecked}
        />
      </Suspense>
    </>
  );
};

export { GeneralDataDesktop };
