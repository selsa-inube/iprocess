import { MdOutlineDelete } from "react-icons/md";
import { useContext, useState } from "react";
import { Icon } from "@inubekit/icon";
import { useFlag } from "@inubekit/flag";

import { tokens } from "@design/tokens";
import { StartProcesses } from "@pages/startProcess/types";
import { DecisionModal } from "@components/modals/DecisionModal";
import { ComponentAppearance } from "@ptypes/aparences.types";
import { AppContext } from "@context/AppContext";
import { removeProcessConfirmInitiated } from "@services/confirmInitiated/deleteConfirmInitiated";

interface DeleteProcessConfirmInitiatedProps {
  data: StartProcesses;
  setDeleteProcess: (processControlId: string) => void;
}

const DeleteProcessConfirmInitiated = (
  props: DeleteProcessConfirmInitiatedProps
) => {
  const { data, setDeleteProcess } = props;
  const { appData } = useContext(AppContext);
  const [fieldEntered, setFieldEntered] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const { addFlag } = useFlag();

  const handleDeleteConfirmInitiated = async () => {
    setLoading(true);
    const dataRemove = {
      processControlId: data.id,
      processDescription: data.description || "",
      removalJustification: fieldEntered,
    };
    try {
      await removeProcessConfirmInitiated(appData.businessUnit.publicCode, dataRemove);
      setShowModal(false);
      addFlag({
        title: "Eliminación Exitosa",
        description: "Se elimino el proceso con éxito",
        appearance: ComponentAppearance.SUCCESS,
        duration: 3000,
      });
      setTimeout(() => {
        setDeleteProcess(data.id as string);
      }, 3000);
    } catch (error) {
      setShowModal(false);
      addFlag({
        title: "Error al eliminar el proceso",
        description:
          "No fue posible eliminar el proceso, por favor intenta más tarde",
        appearance: ComponentAppearance.DANGER,
        duration: 3000,
      });
      throw new Error(
        `Error al eliminar el proceso: ${(error as Error).message} `
      );
    } finally {
      setLoading(false);
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
          appearance={ComponentAppearance.PRIMARY}
          description="¿Confirma que desea Eliminar el Proceso?"
          isLoading={loading}
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
