// index.tsx
import { useContext, useEffect, useState } from "react";
import { MdOutlineSubtitles } from "react-icons/md";
import { Icon } from "@inubekit/icon";
import { useFlag } from "@inubekit/flag";
import { tokens } from "@design/tokens";
import { StatusOfExecutionModal } from "@components/modals/StatusOfExecutionModal";
import { StartProcesses } from "@pages/startProcess/types";
import { personProcess } from "@services/validateProgress/getEstimatedTimeToProcess";
import { ComponentAppearance } from "@ptypes/aparences.types";
import { discardPersonsWithErrors } from "@services/validateProgress/patchDiscardPeopleWithError";
import { AppContext } from "@context/AppContext";
import { reprocessPersonsWithErrors } from "@services/validateProgress/patchReprocessPeopleWithError";
import {
  labels,
  normalizeDataInformationProcess,
} from "./config/cardPerson.config";
import {
  IDiscardPersonsWithErrorsResponse,
  IListOfPeopleToReprocess,
  IPersonProcessTime,
  IProcessPersonsWithErrors,
  IReprocessPersonsWithErrorsResponse,
} from "../../types";

interface IExecutionStatusProps {
  data: StartProcesses;
}

export const ExecutionStatus = (props: IExecutionStatusProps) => {
  const { data } = props;
  const { appData } = useContext(AppContext);
  const { addFlag } = useFlag();
  const [showModal, setShowModal] = useState(false);
  const [loadingDiscard, setLoadingDiscard] = useState<boolean>(false);
  const [loadingReprocess, setLoadingReprocess] = useState<boolean>(false);
  const [totalPersons, setTotalPersons] = useState<number>(0);
  const [totalProcessedPersons, setTotalProcessedPersons] = useState<number>(0);
  const [personProcessData, setPersonProcessData] =
    useState<IPersonProcessTime>();
  const [discardData, setDiscardData] = useState<
    IDiscardPersonsWithErrorsResponse | undefined
  >();

  const [reprocessData, setReprocessData] = useState<
    IReprocessPersonsWithErrorsResponse | undefined
  >();

  const estimatedTimeProcessData = async () => {
    try {
      const newEstimatedTimeProcess = await personProcess(
        appData.businessUnit.publicCode,
        data.id
      );
      setPersonProcessData(newEstimatedTimeProcess);
      setTotalProcessedPersons(newEstimatedTimeProcess.totalProcessedPersons);
      setTotalPersons(newEstimatedTimeProcess.totalPersons);
    } catch (error) {
      throw new Error(
        `Error al obtener los datos: ${(error as Error).message} `
      );
    }
  };

  useEffect(() => {
    if (showModal) {
      estimatedTimeProcessData();
      const interval = setInterval(() => {
        if (totalProcessedPersons < totalPersons) {
          estimatedTimeProcessData();
        } else {
          clearInterval(interval);
        }
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [showModal, totalProcessedPersons, totalPersons]);

  const handleDiscard = async (
    dataDiscardPersons: IProcessPersonsWithErrors[]
  ) => {
    setLoadingDiscard(true);
    const dataDiscard = {
      processControlId: data.id || "",
      processPersons: dataDiscardPersons,
    };

    try {
      const newDiscard = await discardPersonsWithErrors(
        appData.businessUnit.publicCode,
        dataDiscard
      );
      setDiscardData(newDiscard);
    } catch (error) {
      addFlag({
        title: "Error al descartar personas con errores",
        description:
          "No fue posible descartar personas con errores, por favor intenta más tarde",
        appearance: ComponentAppearance.DANGER,
        duration: 5000,
      });
      throw new Error(
        `Error al descartar personas con errores: ${(error as Error).message} `
      );
    } finally {
      setLoadingDiscard(false);
    }
  };

  const handleReprocess = async (
    dataReprocessPersons: IListOfPeopleToReprocess[]
  ) => {
    setLoadingReprocess(true);
    const dataDiscard = {
      processControlId: data.id || "",
      persons: dataReprocessPersons,
    };

    try {
      const newReprocess = await reprocessPersonsWithErrors(
        appData.businessUnit.publicCode,
        dataDiscard
      );
      setReprocessData(newReprocess);
    } catch (error) {
      addFlag({
        title: "Error al reprocesar personas con errores",
        description:
          "No fue posible reprocesar personas con errores, por favor intenta más tarde",
        appearance: ComponentAppearance.DANGER,
        duration: 5000,
      });
      throw new Error(
        `Error al reprocesar personas con errores: ${(error as Error).message} `
      );
    } finally {
      setLoadingReprocess(false);
    }
  };

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <Icon
        appearance="dark"
        icon={<MdOutlineSubtitles />}
        size={tokens.spacing.s200}
        onClick={handleToggleModal}
        cursorHover
        spacing="narrow"
      />
      {showModal && (
        <StatusOfExecutionModal
          portalId="portal"
          dataInformationProcess={normalizeDataInformationProcess(
            data.id,
            personProcessData || ({} as IPersonProcessTime)
          )}
          processControlId={data.id}
          labels={labels}
          onCloseModal={handleToggleModal}
          onReprocess={handleReprocess}
          onDiscard={handleDiscard}
          loadingDiscard={loadingDiscard}
          loadingReprocess={loadingReprocess}
          isdiscardPersonsWithErrors={discardData ? true : false}
          isReprocessPersonsWithErrors={reprocessData ? true : false}
        />
      )}
    </>
  );
};
