import { lazy, Suspense, useState } from "react";
import { MdLaunch } from "react-icons/md";
import { Icon } from "@inubekit/icon";
import { Stack } from "@inubekit/stack";
import { Spinner } from "@inubekit/spinner";
import { Text } from "@inubekit/text";

import { StartProcessModal } from "@components/modals/StartProcessModal";
import { IEntries } from "@components/modals/MoreDetailsModal/types";
import { IFieldsEntered } from "@forms/types";
import { tokens } from "@design/tokens";
import { formatDate, formatDateEndpoint } from "@utils/dates";
import { IStartProcessResponse } from "@pages/startProcess/types";
import { startProcess } from "@services/startProcess/patchStartProcess";
import { routesComponent } from "@pages/startProcess/config/routesForms.config";


interface IStartProcessScheduledProps {
  id: string;
  dataModal: IEntries;
}

const StartProcessScheduled = (props: IStartProcessScheduledProps) => {
  const { dataModal, id } = props;

  const ProgressOfStartProcess = lazy(
    () =>
      import(
        "@pages/startProcess/tabs/scheduled/components/StartProcess/ProgressOfStartProcess"
      )
  );

  const [fieldsEntered, setFieldsEntered] = useState<IFieldsEntered>(
    {} as IFieldsEntered
  );
  const [responseStartProcess, setResponseStartProcess] =
    useState<IStartProcessResponse>();
  const [showStartProcessModal, setShowStartProcessModal] = useState(false);
  const [showProgressModal, setShowProgressModal] = useState(false);

  const handleStartProcess = async () => {
    const processData = {
      processCatalogId: String(id),
      month: Number(dataModal.month),
      publicCode: String(dataModal.publicCode),
      suggestedDescription: String(dataModal.descriptionSuggested),
      year: Number(dataModal.year),
      cutOffDate: formatDateEndpoint(new Date()),
      complementaryDescription: String(fieldsEntered.descriptionComplementary),
      plannedExecution: formatDateEndpoint(dataModal.date as Date),
      plannedExecutionDate: fieldsEntered.plannedExecutionDate
        ? new Date(fieldsEntered.plannedExecutionDate).toISOString()
        : new Date(dataModal.date as Date).toISOString(),
      executionParameters: fieldsEntered.parameters
        ? fieldsEntered.parameters
        : {},
    };
    try {
      const newProcess = await startProcess(processData);
      setResponseStartProcess(newProcess);
      setShowStartProcessModal(!showStartProcessModal);
      setShowProgressModal(true);
    } catch (error) {
      throw new Error(
        `Error al iniciar los procesos en formulario: ${(error as Error).message} `
      );
    } 
      
  };

  const handleToggleModal = () => {
    setShowStartProcessModal(!showStartProcessModal);
  };

  return (
    <>
      <Icon
        appearance="dark"
        icon={<MdLaunch />}
        size={tokens.spacing.s200}
        onClick={handleToggleModal}
        cursorHover
        spacing="narrow"
      />

      {showStartProcessModal && dataModal && (
        <StartProcessModal portalId="portal" onCloseModal={handleToggleModal}>
          { dataModal.url !== "" ? (
            <>
          {routesComponent.map((comp, index) => {
            if (comp.path === dataModal.url) {
              return (
                <Suspense
                  key={index}
                  fallback={
                    <Stack justifyContent="center">
                      <Spinner size="small" appearance="primary" transparent />
                    </Stack>
                  }
                >
                  <comp.component
                    key={index}
                    data={{
                      id: id,
                      descriptionSuggested: dataModal?.descriptionSuggested,
                      date: formatDate(
                        new Date(dataModal.date as string),
                        true
                      ),
                      plannedAutomaticExecution:
                        dataModal?.plannedAutomaticExecution,
                    }}
                    onStartProcess={handleStartProcess}
                    setFieldsEntered={setFieldsEntered}
                  />
                </Suspense>
              );
            }
          })}
          </>
          ) : (
            <Stack>
              <Text type="label" size="medium">
                No se ha encontrado datos para este proceso
              </Text>
            </Stack>
               )}
        </StartProcessModal>
      )}
      {
        responseStartProcess?.processStatus === "Initiated" && showProgressModal && (
          <Suspense fallback={null}>
            <ProgressOfStartProcess
              id={responseStartProcess?.processControlId || ""}
              handleShowProgressModal={setShowProgressModal}
              dateStart={new Date()}
            />
          </Suspense>
        )}
    </>
  );
};

export { StartProcessScheduled };
