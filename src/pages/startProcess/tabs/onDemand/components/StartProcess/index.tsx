import { lazy, Suspense, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdLaunch } from "react-icons/md";
import { Stack,Text, Icon } from "@inubekit/inubekit";
import { Spinner } from "@inubekit/spinner";
import { useFlag } from "@inubekit/flag";

import { StartProcessModal } from "@components/modals/StartProcessModal";
import { IEntries } from "@components/modals/MoreDetailsModal/types";
import { IFieldsEntered } from "@forms/types";
import { tokens } from "@design/tokens";
import { formatISOStringEndpoint, formatDateEndpoint } from "@utils/dates";
import { startProcess } from "@services/startProcess/patchStartProcess";
import { IStartProcessResponse } from "@pages/startProcess/types";
import { routesComponent } from "@pages/startProcess/config/routesForms.config";
import { rediectToConfirmInitiated, redirectToFinished, redirectToValidateProgress } from "@pages/startProcess/utils";
import { ComponentAppearance } from "@ptypes/aparences.types";
import { AppContext } from "@context/AppContext";

interface IStartProcessOnDemandProps {
  dataModal: IEntries;
  id: string;
}

const StartProcessOnDemand = (props: IStartProcessOnDemandProps) => {
  const { id, dataModal } = props;
  const { appData } = useContext(AppContext);
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
      ? formatISOStringEndpoint(new Date(fieldsEntered.plannedExecutionDate))
      : formatISOStringEndpoint(new Date()),
      executionParameters: fieldsEntered.parameters
        ? fieldsEntered.parameters
        : {},
    };

    try {
      setShowStartProcessModal(!showStartProcessModal);
      setShowProgressModal(true);
      const newProcess = await startProcess(appData.businessUnit.publicCode, processData);
      setResponseStartProcess(newProcess);
      
    } catch (error) {
      setShowProgressModal(false);
      addFlag({
        title: "Error al iniciar los procesos",
        description:
          "No fue posible iniciar los procesos, por favor intenta más tarde",
        appearance: ComponentAppearance.DANGER,
        duration: 5000,
      });
      throw new Error(
        `Error al iniciar los procesos en formulario: ${(error as Error).message} `
      );
    }
  };

  useEffect(() => {
    if (responseStartProcess?.processStatus.length) {
      setShowProgressModal(false);

      if ( redirectToValidateProgress.includes(responseStartProcess.processStatus) )
        navigate("/validate-progress");

      if (redirectToFinished.includes(responseStartProcess.processStatus))
        navigate("/finished");

      if (rediectToConfirmInitiated.includes(responseStartProcess.processStatus))
        navigate("/confirm-initiated");

    }
  }, [responseStartProcess]);

  const handleToggleModal = () => {
    setShowStartProcessModal(!showStartProcessModal);
  };

  return (
    <>
      <Icon
        appearance={ComponentAppearance.DARK}
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
                            appearance={ComponentAppearance.PRIMARY}
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
                          date: dataModal.date,
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
