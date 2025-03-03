import React from "react";
import { MdClear } from "react-icons/md";
import { createPortal } from "react-dom";
import { useMediaQuery, Stack, Text } from "@inubekit/inubekit";
import { Blanket } from "@inubekit/blanket";

import { tokens } from "@design/tokens";
import { StartProcesses } from "@pages/startProcess/types";
import { StyledContainer, StyledModal } from "./styles";
import { ILabel } from "./types";
import { GeneralDataMobile } from "./GeneralDataMobile";
import { GeneralDataDesktop } from "./GeneralDataDesktop";

interface StatusOfExecutionModalUIProps {
  dataInformationProcess: StartProcesses;
  labels: ILabel[];
  portalId: string;
  processControlId: string;
  search: string;
  seeErrorsChecked: boolean;
  onChangeSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeToggle: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCloseModal: () => void;
}

const StatusOfExecutionModalUI = (props: StatusOfExecutionModalUIProps) => {
  const {
    dataInformationProcess,
    labels,
    portalId,
    processControlId,
    search,
    seeErrorsChecked,
    onChangeSearch,
    onChangeToggle,
    onCloseModal,
  } = props;

  const isMobile = useMediaQuery("(max-width: 1000px)");

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
                processControlId={processControlId}
                search={search}
                seeErrorsChecked={seeErrorsChecked}
                onChangeSearch={onChangeSearch}
                onChangeToggle={onChangeToggle}
              />
            ) : (
              <GeneralDataDesktop
                dataInformationProcess={dataInformationProcess}
                labels={labels}
                processControlId={processControlId}
                search={search}
                seeErrorsChecked={seeErrorsChecked}
                onChangeSearch={onChangeSearch}
                onChangeToggle={onChangeToggle}
              />
            )}
          </Stack>
        </StyledModal>
      </Blanket>
    </StyledContainer>,
    node
  );
};

export { StatusOfExecutionModalUI };
export type { StatusOfExecutionModalUIProps };
