import { MdClear } from "react-icons/md";
import { createPortal } from "react-dom";

import { Button } from "@inubekit/button";
import { Divider } from "@inubekit/divider";
import { useMediaQuery } from "@inubekit/hooks";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { Blanket } from "@inubekit/blanket";
import { Fieldset } from "@inubekit/fieldset";
import { Label } from "@inubekit/label";

import { Table } from "@components/data/Table";
import { IBreakpoint, ITitle } from "@components/data/Table/props";
import { mediaQueryMobile } from "@config/environment";
import { tokens } from "@design/tokens";
import { StartProcesses } from "@pages/startProcess/types";
import {
  StyledContainer,
  StyledContainerModal,
  StyledContainerRequirements,
  StyledModal,
  StyledModalFields,
  StyledScroll,
} from "./styles";
import { IEntries, ILabel } from "../MoreDetailsModal/types";
import { IData } from "../requirementsModal/types";

interface ExecutionParametersModalProps {
  isVisible: boolean;
  portalId: string;
  data: StartProcesses;
  labels: ILabel[];
  titlesParametersTable: ITitle[];
  entriesParametersTable: IEntries[];
  breakPointsParametersTable: IBreakpoint[];
  onCloseModal: () => void;
  requirement?: IData[];
  breakpointsRequirement?: IBreakpoint[];
}

const ExecutionParametersModal = (props: ExecutionParametersModalProps) => {
  const {
    breakPointsParametersTable,
    data,
    labels,
    isVisible,
    entriesParametersTable,
    portalId,
    titlesParametersTable,
    requirement,
    breakpointsRequirement,
    onCloseModal,
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
          <Stack direction="column" gap={tokens.spacing.s200}>
            <StyledContainerModal>
              <Stack direction="column" gap={tokens.spacing.s100}>
                <Stack alignItems="center" justifyContent="space-between">
                  <Text type="title" size="medium" appearance="dark">
                    Parámetros de Ejecución
                  </Text>
                  <MdClear
                    size={tokens.spacing.s300}
                    cursor="pointer"
                    onClick={onCloseModal}
                  />
                </Stack>
              </Stack>

              <Divider dashed />
              <StyledScroll>
                {labels.map((field, id) => {
                  const value = data[field.id as keyof StartProcesses];
                  return value && value !== "undefined" ? (
                    <StyledModalFields key={id} $smallScreen={isMobile}>
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
                    </StyledModalFields>
                  ) : null;
                })}
                {requirement && requirement.length > 0 && (
                  <Stack direction="column" gap={tokens.spacing.s150}>
                    <Label
                      htmlFor=""
                      size="large"
                      margin={`${tokens.spacing.s0} ${tokens.spacing.s0} ${tokens.spacing.s0} ${tokens.spacing.s200}`}
                    >
                      Requisitos
                    </Label>
                    <StyledContainerRequirements>
                      {requirement.map((requirement) => (
                            <Stack direction="column" key={requirement.id}>
                              <Table
                                id="portal"
                                titles={requirement.titlesRequirements}
                                entries={requirement.entriesRequirements}
                                breakpoints={breakpointsRequirement}
                                isLoading={false}
                                widthFirstColumn="100%"
                                multipleTables={true}
                                typeTitle={"label"}
                              />
                            </Stack>
                          ))}
                    </StyledContainerRequirements>
                  </Stack>
                )}

                {entriesParametersTable.length > 0 && (
                  <>
                    <Divider dashed />
                    <Table
                      id="modals"
                      titles={titlesParametersTable}
                      entries={entriesParametersTable}
                      breakpoints={breakPointsParametersTable}
                      isLoading={isVisible}
                      widthFirstColumn="65%"
                    />
                  </>
                )}
              </StyledScroll>
            </StyledContainerModal>
            <Stack gap={tokens.spacing.s100} justifyContent="flex-end">
              <Button
                spacing="wide"
                appearance="primary"
                variant="filled"
                onClick={onCloseModal}
              >
                Cerrar
              </Button>
            </Stack>
          </Stack>
        </StyledModal>
      </Blanket>
    </StyledContainer>,
    node
  );
};

export { ExecutionParametersModal };
export type { ExecutionParametersModalProps };
