import { lazy, Suspense, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdLaunch } from "react-icons/md";
import { Icon } from "@inubekit/icon";
import { Stack } from "@inubekit/stack";
import { Spinner } from "@inubekit/spinner";
import { Text } from "@inubekit/text";
import { useFlag } from "@inubekit/flag";

import { StartProcessModal } from "@components/modals/StartProcessModal";
import { IEntries } from "@components/modals/MoreDetailsModal/types";
import { IFieldsEntered } from "@forms/types";
import { tokens } from "@design/tokens";
import { formatDate, formatDateEndpoint } from "@utils/dates";
import { startProcess } from "@services/startProcess/patchStartProcess";
import { IStartProcessResponse } from "@pages/startProcess/types";
import { routesComponent } from "@pages/startProcess/config/routesForms.config";

interface IStartProcessOnDemandProps {
  dataModal: IEntries;
  id: string;
}

const StartProcessOnDemand = (props: IStartProcessOnDemandProps) => {
  const { id, dataModal } = props;
  const [fieldsEntered, setFieldsEntered] = useState({} as IFieldsEntered);
  const { addFlag } = useFlag();

  const navigate = useNavigate();

  const ProgressOfStartProcessOnDemand = lazy(
    () =>
      import(
        "@pages/startProcess/tabs/onDemand/components/StartProcess/ProgressOfStartProcess"
      )
  );

  const [responseStartProcess, setResponseStartProcess] =
    useState<IStartProcessResponse>();
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [showStartProcessModal, setShowStartProcessModal] = useState(false);
  const [error, setError] = useState(false);

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
      setShowStartProcessModal(!showStartProcessModal);
      setShowProgressModal(true);
      const newProcess = await startProcess(processData);
      setResponseStartProcess(newProcess);
      
    } catch (error) {
      setError(true);
  
      addFlag({
        title: "Error al iniciar los procesos",
        description:
          "No fue posible iniciar los procesos, por favor intenta más tarde",
        appearance: "danger",
        duration: 5000,
      });
      window.location.reload();
      throw new Error(
        `Error al iniciar los procesos en formulario: ${(error as Error).message} `
      );
      
    }
  };

  useEffect(() => {
    if (responseStartProcess?.processStatus.length) {
      setShowProgressModal(false);

      if (
        responseStartProcess.processStatus === "StartedImmediately" ||
        responseStartProcess.processStatus === "Programmed" ||
        responseStartProcess.processStatus === "InAction"
      )
        navigate("/validate-progress");

      if (responseStartProcess.processStatus === "Finished")
        navigate("/finished");

      if (responseStartProcess.processStatus === "Initiated" || responseStartProcess.processStatus === "PartiallyStarted")
        navigate("/confirm-initiated");

    }
  }, [responseStartProcess]);

  useEffect(() => {
    if (error) {
      setShowProgressModal(false);
    }
  }, [error]);

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
          {dataModal.url !== "" ? (
            <>
              {routesComponent.map((comp, index) => {
                if (comp.path === dataModal.url) {
                  return (
                    <Suspense
                      key={index}
                      fallback={
                        <Stack justifyContent="center">
                          <Spinner
                            size="small"
                            appearance="primary"
                            transparent
                          />
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
                          executionWay:
                            dataModal?.executionWay,
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
      {showProgressModal && (
        <Suspense fallback={null}>
          <ProgressOfStartProcessOnDemand
            id={String(id) || ""}
            handleShowProgressModal={setShowProgressModal}
            dateStart={new Date()}
          />
        </Suspense>
      )}
    </>
  );
};

export { StartProcessOnDemand };
