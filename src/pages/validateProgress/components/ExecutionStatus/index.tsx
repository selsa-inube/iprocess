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
import {
  labels,
  normalizeDataInformationProcess,
} from "./config/cardPerson.config";
import { IDiscardPersonsWithErrorsResponse, IPersonProcessTime, IProcessPersonsWithErrors } from "../../types";

interface IExecutionStatusProps {
  data: StartProcesses;
}

export const ExecutionStatus = (props: IExecutionStatusProps) => {
  const { data } = props;
  const { appData } = useContext(AppContext);
  const { addFlag } = useFlag();
  const [showModal, setShowModal] = useState(false);
  const [loadingDiscard, setLoadingDiscard] = useState<boolean>(false);

  const [personProcessData, setPersonProcessData] =
    useState<IPersonProcessTime>();
  const [discardData, setDiscardData] = useState<
    IDiscardPersonsWithErrorsResponse | undefined
  >();

  const estimatedTimeProcessData = async () => {
    try {
      const newEstimatedTimeProcess = await personProcess(
        appData.businessUnit.publicCode,
        data.id
      );
      setPersonProcessData(newEstimatedTimeProcess);
    } catch (error) {
      throw new Error(
        `Error al obtener los datos: ${(error as Error).message} `
      );
    }
  };

  useEffect(() => {
    if (showModal) {
      estimatedTimeProcessData();
    }
  }, [showModal]);

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
          attributes={[
            "personPublicCode",
            "executionStatusByPerson",
            "personName",
            "startDate",
            "finishDate",
          ]}
          portalId="portal"
          dataInformationProcess={normalizeDataInformationProcess(
            data.id,
            personProcessData || ({} as IPersonProcessTime)
          )}
          processControlId={data.id}
          labels={labels}
          onCloseModal={handleToggleModal}
          onReprocess={() => {}}
          onDiscard={handleDiscard}
          loadingDiscard={loadingDiscard}
          isdiscardPersonsWithErrors={discardData ? true : false}
        />
      )}
    </>
  );
};
