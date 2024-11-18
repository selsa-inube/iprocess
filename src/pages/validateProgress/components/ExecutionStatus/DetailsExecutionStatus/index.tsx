import { useContext, useEffect, useState } from "react";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { Icon } from "@inubekit/icon";

import { DetailModal } from "@components/modals/DetailModal";
import { tokens } from "@design/tokens";
import { IPersonProcess } from "@components/feedback/CardStatusExecution/types";
import { personWithError } from "@services/validateProgress/getPersonWithError";
import { AppContext } from "@context/AppContext";
import { normalizeStatusRequirementByStatus } from "@utils/requirements";
import { labelsDetails } from "../config/cardPerson.config";

interface IDetailsExecutionStatusProps {
  data: IPersonProcess;
  filteredWithErrors: boolean;
}

const DetailsExecutionStatus = (props: IDetailsExecutionStatusProps) => {
  const { data, filteredWithErrors } = props;

  const { appData } = useContext(AppContext);
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

      const dataErrors = newError.find((item) => item);
      data.errorsDescription = dataErrors?.errorDescription;
      data.statusText = normalizeStatusRequirementByStatus(dataErrors?.errorStatus || "")?.name;
    } catch (error) {
      throw new Error(
        `Error al obtener los datos: ${(error as Error).message} `
      );
    }
  };

  useEffect(() => {
    filteredWithErrors && errorInPersonData();
  }, []);

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
