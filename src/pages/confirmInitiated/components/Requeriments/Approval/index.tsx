import { useContext, useEffect, useState } from "react";
import { MdOutlineCheckCircle } from "react-icons/md";
import { Icon } from "@inubekit/icon";
import { useFlag } from "@inubekit/flag";

import { approvalRequirement } from "@services/confirmInitiated/patchApproval";
import { ApprovalModal } from "@components/modals/ApprovalModal";
import { IApprovalEntry } from "@components/modals/ApprovalModal/types";
import { IRefNumPackageRequirement } from "@ptypes/packageRequeriment.types";
import { ProgressCardWithBarIndetermined } from "@components/feedback/ProgressCardWithBarIndetermined";
import { AppContext } from "@context/AppContext";
import { IApprovalResponse, IListOfRequirementsByPackage } from "./types";

interface ApprovalProps {
  dataListOfRequirements: IListOfRequirementsByPackage;
  dataPackage: IRefNumPackageRequirement;
}

const Approval = (props: ApprovalProps) => {
  const { dataListOfRequirements, dataPackage } = props;
  const [showModal, setShowModal] = useState(false);
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [responseApproval, setResponseApproval] = useState<IApprovalResponse>();
  const [fieldsEntered, setFieldsEntered] = useState<IApprovalEntry>();
  const { user } = useContext(AppContext);
  const { addFlag } = useFlag();

  const handleApproval = async () => {
    const justification = `Actualizado por el usuario ${user.username} del gestor de procesos INUBE -${fieldsEntered?.observation}`;

    const dataApproval = {
      id: dataPackage?.id,
      justification,
      date: dataPackage?.date ? new Date(dataPackage.date).toISOString() : "",
      description: dataPackage?.description,
      uniqueReferenceNumber: dataPackage?.uniqueReferenceNumber,
      listOfRequirementsByPackage: [dataListOfRequirements],
      //traceabilityInRequirements: {},///////////////////revisar
    };
    try {
      setShowModal(!showModal);
      setShowProgressModal(true);
      const newApproval = await approvalRequirement(dataApproval);
      setResponseApproval(newApproval);
    } catch (error) {
      setShowProgressModal(false);
      addFlag({
        title: "Error al iniciar los procesos",
        description:
          "No fue posible iniciar los procesos, por favor intenta más tarde",
        appearance: "danger",
        duration: 5000,
      });
      throw new Error(
        `Error al aprobar en el requerimiento: ${(error as Error).message} `
      );
    }
  };

  useEffect(() => {
    if(responseApproval){///////////////////revisar
      setShowProgressModal(false);
    }
  }, [responseApproval]);

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <Icon
        appearance="dark"
        icon={<MdOutlineCheckCircle />}
        size="16px"
        onClick={handleToggleModal}
        cursorHover
      />

      {showModal && (
        <ApprovalModal
          portalId="portal"
          onCloseModal={handleToggleModal}
          onConfirm={handleApproval}
          setFieldsEntered={setFieldsEntered}
        />
      )}
      {showProgressModal && (
        <ProgressCardWithBarIndetermined portalId="portal" />
      )}
    </>
  );
};

export { Approval };
