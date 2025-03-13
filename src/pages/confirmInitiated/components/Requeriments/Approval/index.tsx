import { useContext, useEffect, useState } from "react";
import { MdOutlineCheckCircle } from "react-icons/md";
import { Icon, useFlag } from "@inubekit/inubekit";

import { approvalRequirement } from "@services/confirmInitiated/patchApproval";
import { ApprovalModal } from "@components/modals/ApprovalModal";
import { IApprovalEntry } from "@components/modals/ApprovalModal/types";
import { ProgressCardWithBarIndetermined } from "@components/feedback/ProgressCardWithBarIndetermined";
import { AppContext } from "@context/AppContext";
import { ComponentAppearance } from "@ptypes/aparences.types";
import { formatDateEndpoint } from "@utils/dates";
import { IApprovalResponse, IListOfRequirementsByPackage } from "./types";
import { requirementsNotMet } from "../config/tablesRequirements.config";

interface ApprovalProps {
  dataListOfRequirements: IListOfRequirementsByPackage;
  packageId: string;
  setLoadDataTable:(show:boolean) => void;
}

const Approval = (props: ApprovalProps) => {
  const { dataListOfRequirements, packageId, setLoadDataTable } = props;
  const [showModal, setShowModal] = useState(false);
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [responseApproval, setResponseApproval] = useState<IApprovalResponse>();
  const [fieldsEntered, setFieldsEntered] = useState<IApprovalEntry>();
const {appData} = useContext(AppContext);
  const { addFlag } = useFlag();

  const handleApproval = async () => {
    const justification = `Actualizado por el usuario ${appData.user.userName} del gestor de procesos INUBE - ${fieldsEntered?.observation}`;

    const dataApproval = {
      packageId: packageId,
      modifyJustification: justification,
      requirementModifyDate: formatDateEndpoint(new Date(dataListOfRequirements.requirementDate)),
      requirementPackageId: dataListOfRequirements.requirementPackageId,
    };
    try {
      setShowModal(!showModal);
      setShowProgressModal(true);
      const newApproval = await approvalRequirement(appData.businessUnit.publicCode, dataApproval);
      setResponseApproval(newApproval);  
    } catch (error) {
      setShowProgressModal(false);
      addFlag({
        title: "Error al aprobar o rechazar el requerimiento",
        description:
          "No fue posible aprobar o rechazar el requerimiento, por favor intenta más tarde",
        appearance: ComponentAppearance.DANGER,
        duration: 5000,
      });
      throw new Error(
        `Error al aprobar o rechazar en el requerimiento: ${(error as Error).message} `
      );
    }
  };

  useEffect(() => {
    if (responseApproval) {
      setShowProgressModal(false);
      setLoadDataTable(true);
    }
  }, [responseApproval]);

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  const isApprovalRequirement = !requirementsNotMet.includes(
    dataListOfRequirements.requirementStatus
  );

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
          approvalChecked={isApprovalRequirement}
          onCloseModal={handleToggleModal}
          onConfirm={handleApproval}
          setFieldEntered={setFieldsEntered}
        />
      )}
      {showProgressModal && (
        <ProgressCardWithBarIndetermined portalId="portal" />
      )}
    </>
  );
};

export { Approval };
