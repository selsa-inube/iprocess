import React, { lazy, Suspense } from "react";
import { MdClear } from "react-icons/md";
import { createPortal } from "react-dom";
import { useMediaQuery } from "@inubekit/hooks";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { Blanket } from "@inubekit/blanket";
import { Grid } from "@inubekit/grid";
import { Label } from "@inubekit/label";
import { Fieldset } from "@inubekit/fieldset";
import { Divider } from "@inubekit/divider";
import { Toggle } from "@inubekit/toggle";
import { Input } from "@inubekit/input";
import { Button } from "@inubekit/button";

import { tokens } from "@design/tokens";
import { StartProcesses } from "@pages/startProcess/types";
import { mediaQueryMobile } from "@config/environment";
import { ComponentAppearance } from "@ptypes/aparences.types";
import { CardStatusExecution } from "@components/feedback/CardStatusExecution";
import { IListOfPeopleToReprocess, IProcessPersonsWithErrors } from "@pages/validateProgress/types";
import { StyledContainer, StyledFields, StyledModal } from "./styles";
import { ILabel } from "./types";

interface StatusOfExecutionModalUIProps {
  dataInformationProcess: StartProcesses;
  dataSubtmit: IProcessPersonsWithErrors[] | undefined;
  disabledBoton: boolean;
  isdiscardPersonsWithErrors: boolean;
  isReprocessPersonsWithErrors: boolean;
  labels: ILabel[];
  loadingDiscard: boolean;
  loadingReprocess: boolean;
  portalId: string;
  processControlId: string;
  search: string;
  seeErrorsChecked: boolean;
  onChangeSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeToggle: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCloseModal: () => void;
  onDiscard: (data: IProcessPersonsWithErrors[]) => void;
  onProcessPersonId: (id: string | undefined, publicCode: string | undefined, check: boolean) => void;
  onReprocess: (data: IListOfPeopleToReprocess[]) => void;
}

const StatusOfExecutionModalUI = (props: StatusOfExecutionModalUIProps) => {
  const {
    dataInformationProcess,
    isdiscardPersonsWithErrors,
    isReprocessPersonsWithErrors,
    labels,
    portalId,
    processControlId,
    search,
    seeErrorsChecked,
    disabledBoton, 
    dataSubtmit,
    loadingDiscard,
    loadingReprocess,
    onChangeSearch,
    onChangeToggle,
    onCloseModal,
    onDiscard,
    onReprocess,
    onProcessPersonId
  } = props;

  const isMobile = useMediaQuery(mediaQueryMobile);

  const node = document.getElementById(portalId);

  if (!node) {
    throw new Error(
      "The portal node is not defined. This can occur when the specific node used to render the portal has not been defined correctly."
    );
  }

  const CardStatusExecutionGroupComponent = lazy(() =>
    import("@components/feedback/CardStatusExecutionGroup").then((module) => ({
      default: module.CardStatusExecutionGroup,
    }))
  );

  return createPortal(
    <StyledContainer>
      <Blanket>
        <StyledModal $smallScreen={isMobile}>
          <Stack direction="column" gap={tokens.spacing.s250}>
            <Stack direction="column">
              <Stack alignItems="center" justifyContent="space-between">
                <Text
                  type="title"
                  size="medium"
                  appearance="dark"
                  weight="bold"
                >
                  Estado de la ejecución
                </Text>
                <MdClear size="24px" cursor="pointer" onClick={onCloseModal} />
              </Stack>
            </Stack>
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
                  <StyledFields key={id} $smallScreen={isMobile}>
                    <Label
                      htmlFor={field.id}
                      size="large"
                      margin={`${tokens.spacing.s0} ${tokens.spacing.s0} ${tokens.spacing.s0} ${tokens.spacing.s200}`}
                    >
                      {field.titleName}
                    </Label>
                    <Fieldset
                      legend=""
                      spacing="compact"
                      type="title"
                      size="medium"
                    >
                      <Text type="body" size="medium">
                        {value}
                      </Text>
                    </Fieldset>
                  </StyledFields>
                ) : null;
              })}
            </Grid>
            <Divider dashed />

            <Grid
              templateColumns="2fr 1fr 1fr"
              alignItems="center"
              height="40px"
            >
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
                placeholder="Búsqueda..."
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
                <Stack gap={tokens.spacing.s200} width="100%" wrap="wrap">
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
                handleProcessPersonId={onProcessPersonId}
                isdiscardPersonsWithErrors={isdiscardPersonsWithErrors}
                isReprocessPersonsWithErrors={isReprocessPersonsWithErrors}
              />
            </Suspense>
          </Stack>
          <Stack gap={tokens.spacing.s100} justifyContent="flex-end">
            <Button
              spacing="wide"
              appearance={ComponentAppearance.GRAY}
              variant="filled"
              onClick={() => dataSubtmit && onReprocess(dataSubtmit)}
              disabled={disabledBoton}
              loading={loadingReprocess}
            >
              Reprocesar
            </Button>
            <Button
              spacing="wide"
              appearance={ComponentAppearance.PRIMARY}
              variant="filled"
              onClick={() => dataSubtmit && onDiscard(dataSubtmit)}
              disabled={disabledBoton}
              loading={loadingDiscard}
            >
              Descartar
            </Button>
          </Stack>
        </StyledModal>
      </Blanket>
    </StyledContainer>,
    node
  );
};

export { StatusOfExecutionModalUI };
export type { StatusOfExecutionModalUIProps };
