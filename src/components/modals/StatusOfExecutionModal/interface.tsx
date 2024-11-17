import React from "react";
import { MdClear } from "react-icons/md";
import { createPortal } from "react-dom";
import { useMediaQuery } from "@inubekit/hooks";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { Blanket } from "@inubekit/blanket";
import { Button } from "@inubekit/button";

import { tokens } from "@design/tokens";
import { StartProcesses } from "@pages/startProcess/types";
import { mediaQueryMobile } from "@config/environment";
import { ComponentAppearance } from "@ptypes/aparences.types";
import { IProcessPersonsWithErrors } from "@pages/validateProgress/types";
import { StyledContainer, StyledModal } from "./styles";
import { ILabel } from "./types";
import { GeneralDataMobile } from "./GeneralDataMobile";
import { GeneralDataDesktop } from "./GeneralDataDesktop";

interface StatusOfExecutionModalUIProps {
  dataInformationProcess: StartProcesses;
  dataSubtmit: IProcessPersonsWithErrors[] | undefined;
  disabledBoton: boolean;
  isdiscardPersonsWithErrors: boolean;
  labels: ILabel[];
  loadingDiscard: boolean;
  portalId: string;
  processControlId: string;
  search: string;
  seeErrorsChecked: boolean;
  onChangeSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeToggle: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCloseModal: () => void;
  onDiscard: (data: IProcessPersonsWithErrors[]) => void;
  onProcessPersonId: (id: string | undefined, check: boolean) => void;
  onReprocess: () => void;
}

const StatusOfExecutionModalUI = (props: StatusOfExecutionModalUIProps) => {
  const {
    dataInformationProcess,
    isdiscardPersonsWithErrors,
    labels,
    portalId,
    processControlId,
    search,
    seeErrorsChecked,
    disabledBoton,
    dataSubtmit,
    loadingDiscard,
    onChangeSearch,
    onChangeToggle,
    onCloseModal,
    onDiscard,
    onReprocess,
    onProcessPersonId,
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
            {isMobile ? (
              <GeneralDataMobile
                dataInformationProcess={dataInformationProcess}
                labels={labels}
                isdiscardPersonsWithErrors={isdiscardPersonsWithErrors}
                processControlId={processControlId}
                search={search}
                seeErrorsChecked={seeErrorsChecked}
                onChangeSearch={onChangeSearch}
                onChangeToggle={onChangeToggle}
                onProcessPersonId={onProcessPersonId}
              />
            ) : (
              <GeneralDataDesktop
                dataInformationProcess={dataInformationProcess}
                labels={labels}
                isdiscardPersonsWithErrors={isdiscardPersonsWithErrors}
                processControlId={processControlId}
                search={search}
                seeErrorsChecked={seeErrorsChecked}
                onChangeSearch={onChangeSearch}
                onChangeToggle={onChangeToggle}
                onProcessPersonId={onProcessPersonId}
              />
            )}
          </Stack>
          <Stack gap={tokens.spacing.s100} justifyContent="flex-end">
            <Button
              spacing="wide"
              appearance={ComponentAppearance.GRAY}
              variant="filled"
              onClick={onReprocess}
              disabled={disabledBoton}
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
