import { MdCheckCircleOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Icon } from "@inubekit/icon";
import { useFlag } from "@inubekit/flag";

import { tokens } from "@design/tokens";
import { StartProcesses } from "@pages/startProcess/types";
import { DecisionModal } from "@components/modals/DecisionModal";
import { ComponentAppearance } from "@ptypes/aparences.types";
import { confirmIndividualProcess } from "@services/confirmInitiated/pathConfirmIndividualProcess";
import { IConfirmProcessResponse } from "../../types";

interface ConfirmProcessProps {
  data: StartProcesses;
}

const ConfirmProcess = (props: ConfirmProcessProps) => {
  const { data } = props;
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [confirmProcessData, setConfirmProcessData] =
    useState<IConfirmProcessResponse>();

    const {addFlag} =useFlag();
  const navigate = useNavigate();

  const newData = {
    processControlId: data.id,
  };

  const handleConfirmProcess = async () => {
    setLoading(true);
    try {
      const newConfirm = await confirmIndividualProcess(newData);
      setConfirmProcessData(newConfirm);
    } catch (error) {
      setShowModal(false);
      addFlag({
        title: "Error al confirmar el proceso",
        description:
          "No fue posible confirmar el proceso, por favor intenta más tarde",
        appearance: ComponentAppearance.DANGER,
        duration: 5000,
      })
      throw new Error(
        `Error al confirma el  proceso: ${(error as Error).message} `
      );
    } finally {
      setLoading(false);
    }
  };

  const redirectToValidateProgress = [
    "StartedImmediately",
    "Programmed",
    "InAction",
  ];

  const redirectToFinished = ["Finished"]

  useEffect(() => {
    if (confirmProcessData?.processStatus.length) {
      setShowModal(false);

      if (redirectToValidateProgress.includes(confirmProcessData.processStatus))
        navigate("/validate-progress");

      if (redirectToFinished.includes(confirmProcessData.processStatus))
        navigate("/finished");
    }
  }, [confirmProcessData]);

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <Icon
        appearance={ComponentAppearance.DARK}
        icon={<MdCheckCircleOutline />}
        size={tokens.spacing.s200}
        onClick={handleToggleModal}
        cursorHover
        spacing="narrow"
      />
      {showModal && data && (
        <DecisionModal
          title="Confirmación"
          actionText="Confirmar"
          portalId="portal"
          appearance={ComponentAppearance.PRIMARY}
          description="¿Confirma que desea Iniciar el Proceso?"
          isLoading={loading}
          onCloseModal={handleToggleModal}
          onClick={handleConfirmProcess}
        />
      )}
    </>
  );
};

export { ConfirmProcess };
