import { useEffect, useState } from "react";
import { MdOutlineSubtitles } from "react-icons/md";
import { Icon } from "@inubekit/icon";
import { tokens } from "@design/tokens";
import { StatusOfExecutionModal } from "@components/modals/StatusOfExecutionModal";
import { peopleIncludedInProcess } from "@services/validateProgress/getPeopleIncludedInProcess";
import { StartProcesses } from "@pages/startProcess/types";
import { estimatedTimeToCompleteProcess } from "@services/validateProgress/getEstimatedTimeToProcess";
import {
  labels,
  normalizeDataInformationProcess,
  normalizeDataPerson,
} from "./config/cardPerson.config";
import {
  IEstimatedTimeToCompleteProcess,
  IpeopleIncludedInTheProcess,
} from "../../types";

interface IExecutionStatusProps {
  data: StartProcesses;
}

export const ExecutionStatus = (props: IExecutionStatusProps) => {
  const { data } = props;

  const [showModal, setShowModal] = useState(false);

  const [loading, setLoading] = useState<boolean>(false);
  const [peopleIncludedData, setPeopleIncludedData] =
    useState<IpeopleIncludedInTheProcess>();
  const [timeProcess, setTimeProcess] =
    useState<IEstimatedTimeToCompleteProcess>();

  const peopleIncludedInProcessData = async () => {
    setLoading(true);
    try {
      const newpeopleIncludedInProcess = await peopleIncludedInProcess(data.id);
      setPeopleIncludedData(newpeopleIncludedInProcess);
    } catch (error) {
      throw new Error(
        `Error al obtener los datos: ${(error as Error).message} `
      );
    } finally {
      setLoading(false);
    }
  };

  const estimatedTimeProcessData = async () => {
    try {
      const newEstimatedTimeProcess = await estimatedTimeToCompleteProcess(
        data.id
      );
      setTimeProcess(newEstimatedTimeProcess);
    } catch (error) {
      throw new Error(
        `Error al obtener los datos: ${(error as Error).message} `
      );
    }
  };

  useEffect(() => {
    if(showModal){
      estimatedTimeProcessData();
      peopleIncludedInProcessData();
    }
  }, [showModal]);

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
          attributes={["code", "status", "namePerson", "dateStart", "dateEnd"]}
          portalId="portal"
          dataInformationProcess={normalizeDataInformationProcess(
            data,
            timeProcess?.duration || ""
          )}
          isLoading={loading}
          dataPerson={normalizeDataPerson(
            peopleIncludedData?.processPersons || []
          )}
          labels={labels}
          onCloseModal={handleToggleModal}
          onReprocess={() => {}}
          onDiscard={() => {}}
        />
      )}
    </>
  );
};
