import { MdOutlineDelete } from "react-icons/md";
import { useState } from "react";
import { Icon } from "@inubekit/icon";
import { useFlag } from "@inubekit/flag";

import { removeProcessConfirmInitiated } from "@services/confirmInitiated/getConfirmInitiated/deleteConfirmInitiated";
import { tokens } from "@design/tokens";
import { StartProcesses } from "@pages/startProcess/types";
import { DecisionModal } from "@components/modals/DecisionModal";

interface DeleteProcessConfirmInitiatedProps {
  data: StartProcesses;
}

const DeleteProcessConfirmInitiated = (
  props: DeleteProcessConfirmInitiatedProps
) => {
  const { data } = props;
  const [fieldEntered, setFieldEntered] = useState("");
  const [showModal, setShowModal] = useState(false);
  const { addFlag } = useFlag();

  const handleDeleteConfirmInitiated = async () => {
    const dataRemove = {
      processControlId: data.id,
      processDescription: data.description,
      removalJustification: fieldEntered,
    };
    try {
      await removeProcessConfirmInitiated(dataRemove);
      setShowModal(false);
      addFlag({
        title: "Eliminación Exitosa",
        description:
          "Se elimino el proceso con éxito",
        appearance: "success",
        duration: 5000,
      });
    } catch (error) {
      setShowModal(false);
      addFlag({
        title: "Error al eliminar el proceso",
        description:
          "No fue posible eliminar el proceso, por favor intenta más tarde",
        appearance: "danger",
        duration: 5000,
      });
      throw new Error(
        `Error al eliminar el proceso: ${(error as Error).message} `
      );
    }
  };

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };
  return (
    <>
      <Icon
        appearance="dark"
        icon={<MdOutlineDelete />}
        size={tokens.spacing.s200}
        onClick={handleToggleModal}
        cursorHover
        spacing="narrow"
      />
      {showModal && data && (
        <DecisionModal
          actionText="Eliminar"
          portalId="portal"
          appearance="danger"
          description="¿Confirma que desea Eliminar el Proceso?"
          isLoading={false}
          justificationOfDecision
          onCloseModal={handleToggleModal}
          onClick={handleDeleteConfirmInitiated}
          setFieldEntered={setFieldEntered}
          title="Eliminar"
        />
      )}
    </>
  );
};

export { DeleteProcessConfirmInitiated };
