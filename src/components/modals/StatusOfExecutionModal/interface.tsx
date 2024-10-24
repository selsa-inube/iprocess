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
import { CardStatusExecution } from "@components/feedback/CardStatusExecution";
import { CardStatusExecutionGroup } from "@components/feedback/CardStatusExecutionGroup";
import { IPersonProcess } from "@components/feedback/CardStatusExecution/types";
import { ComponentAppearance } from "@ptypes/aparences.types";
import {
  StyledContainer,
  StyledFields,
  StyledModal,
} from "./styles";
import { ILabel } from "./types";

interface StatusOfExecutionModalUIProps {
  attributes: string[];
  dataInformationProcess: StartProcesses;
  dataPerson: IPersonProcess[];
  isLoading: boolean;
  labels: ILabel[];
  portalId: string;
  search: string;
  seeErrorsChecked: boolean;
  onChangeSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeToggle: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCloseModal: () => void;
  onDiscard: () => void;
  onReprocess: () => void;
}

const StatusOfExecutionModalUI = (props: StatusOfExecutionModalUIProps) => {
  const {
    attributes,
    dataInformationProcess,
    dataPerson,
    isLoading,
    labels,
    portalId,
    search,
    seeErrorsChecked,
    onChangeSearch,
    onChangeToggle,
    onCloseModal,
    onDiscard,
    onReprocess,
  } = props;

  const isMobile = useMediaQuery(mediaQueryMobile);

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
          <Stack direction="column" gap={tokens.spacing.s250}>
            <Stack direction="column" gap={tokens.spacing.s100}>
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
              gap={tokens.spacing.s200}
            >
              {labels.map((field, id) => {
                const value =
                  dataInformationProcess[field.id as keyof StartProcesses];
                return value && value !== "undefined" ? (
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
                        {String(value)}
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

            {isLoading ? (
              <Stack gap={tokens.spacing.s200} width="100%" wrap="wrap">
                <CardStatusExecution isLoading={isLoading} />
                <CardStatusExecution isLoading={isLoading} />
                <CardStatusExecution isLoading={isLoading} />
              </Stack>
            ) : (
              <CardStatusExecutionGroup
                attributes={attributes}
                entries={dataPerson}
                filter={search}
              />
            )}
          </Stack>
          <Stack gap={tokens.spacing.s100} justifyContent="flex-end">
            <Button
              spacing="wide"
              appearance="gray"
              variant="filled"
              onClick={onReprocess}
              disabled={false}
            >
              Reprocesar
            </Button>
            <Button
              spacing="wide"
              appearance={ComponentAppearance.PRIMARY}
              variant="filled"
              onClick={onDiscard}
              disabled={false}
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
