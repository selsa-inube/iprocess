import { useContext, useEffect, useState } from "react";
import { MdOutlineSubtitles } from "react-icons/md";
import { Icon } from "@inubekit/icon";
import { tokens } from "@design/tokens";
import { StatusOfExecutionModal } from "@components/modals/StatusOfExecutionModal";
import { StartProcesses } from "@pages/startProcess/types";
import { personProcess } from "@services/validateProgress/getEstimatedTimeToProcess";
import { AppContext } from "@context/AppContext";
import {
  labels,
  normalizeDataInformationProcess,
} from "./config/cardPerson.config";
import {

  IPersonProcessTime,

} from "../../types";

interface IExecutionStatusProps {
  data: StartProcesses;
}

export const ExecutionStatus = (props: IExecutionStatusProps) => {
  const { data } = props;
  const { appData } = useContext(AppContext);
  const [showModal, setShowModal] = useState(false);
  const [totalPersons, setTotalPersons] = useState<number>(0);
  const [totalProcessedPersons, setTotalProcessedPersons] = useState<number>(0);
  const [personProcessData, setPersonProcessData] =
    useState<IPersonProcessTime>();

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
        />
      )}
    </>
  );
};
