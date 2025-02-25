import { useContext, useEffect, useState } from "react";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { Icon } from "@inubekit/inubekit";
import { useFlag } from "@inubekit/flag";

import { DetailModal } from "@components/modals/DetailModal";
import { tokens } from "@design/tokens";
import { IPersonProcess } from "@components/feedback/CardStatusExecution/types";
import { personWithError } from "@services/validateProgress/getPersonWithError";
import { AppContext } from "@context/AppContext";
import { ComponentAppearance } from "@ptypes/aparences.types";
import { normalizeStatusRequirementByStatus } from "@utils/requirements";
import { labelsDetails } from "../../config/cardPerson.config";

interface IDetailsExecutionStatusProps {
  data: IPersonProcess;
}

const DetailsExecutionStatus = (props: IDetailsExecutionStatusProps) => {
  const { data } = props;

  const { appData } = useContext(AppContext);
  const [showModal, setShowModal] = useState(false);
  const [dataShow, setDataShow] = useState(data);

  const { addFlag } = useFlag();

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
      setDataShow((prev) => ({
        ...prev,
        errorsDescription: dataErrors?.errorDescription,
        statusText: normalizeStatusRequirementByStatus(
          dataErrors?.errorStatus || ""
        )?.name,
      }));
    } catch (error) {
      addFlag({
        title: "Error en la consulta de errores",
        description:
          "No fue posible consulta los errores, por favor intenta más tarde",
        appearance: ComponentAppearance.DANGER,
        duration: 5000,
      });
      throw new Error(
        `Error al obtener los datos: ${(error as Error).message} `
      );
    }
  };

  useEffect(() => {
    errorInPersonData();
  }, []);

  useEffect(() => {
    if (showModal) {
      errorInPersonData();
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
          data={dataShow}
          labels={labelsDetails}
          onCloseModal={handleToggleModal}
        />
      )}
    </>
  );
};

export { DetailsExecutionStatus };
