import { useContext, useEffect, useState } from "react";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { Icon } from "@inubekit/icon";

import { DetailModal } from "@components/modals/DetailModal";
import { tokens } from "@design/tokens";
import { IPersonProcess } from "@components/feedback/CardStatusExecution/types";
import { labelsDetails } from "../config/cardPerson.config";
import { IPersonWithError } from "@pages/validateProgress/types";
import { personWithError } from "@services/validateProgress/getPersonWithError";
import { AppContext } from "@context/AppContext";

interface IDetailsExecutionStatusProps {
  data: IPersonProcess;
}

const DetailsExecutionStatus = (props: IDetailsExecutionStatusProps) => {
  const { data } = props;

  const { appData } = useContext(AppContext);
  const [errorInPerson, setErrorInPerson] = useState<IPersonWithError>();
  const [showModal, setShowModal] = useState(false);

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  const errorInPersonData = async () => {
    try {
      const newError = await personWithError(
        appData.businessUnit.publicCode,
        data.processControlId || "",
        data.processPersonId
      );
      setErrorInPerson(newError.find((item) => item));
    } catch (error) {
      throw new Error(
        `Error al obtener los datos: ${(error as Error).message} `
      );
    }
  };

  useEffect(() => {
    if (showModal) {
      errorInPersonData();
      data.errorsDescription = errorInPerson?.errorDescription;
    }
  }, [showModal]);

  return (
    <>
      <Icon
        appearance="dark"
        icon={<MdOutlineRemoveRedEye />}
        size={tokens.spacing.s200}
        onClick={handleToggleModal}
        cursorHover
        spacing="narrow"
      />
      {showModal && data && (
        <DetailModal
          portalId="portal"
          title="Detalle"
          data={data}
          labels={labelsDetails}
          onCloseModal={handleToggleModal}
        />
      )}
    </>
  );
};

export { DetailsExecutionStatus };
