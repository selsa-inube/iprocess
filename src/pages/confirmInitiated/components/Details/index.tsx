import { useState } from "react";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { Icon } from "@inubekit/icon";

import { IActions } from "@components/data/Table/props";
import { DetailModal } from "@components/modals/DetailModal";
import { labelsDetails } from "../../config/table.config";


interface IDetailsConfirmInitiatedProps {
  data: IActions;
}

 const DetailsConfirmInitiated= (props: IDetailsConfirmInitiatedProps) => {
  const { data } = props;

  const [showModal, setShowModal] = useState(false);

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <Icon
        appearance="dark"
        icon={<MdOutlineRemoveRedEye />}
        size="16px"
        onClick={handleToggleModal}
        cursorHover
        spacing="none"
      />
      {showModal && data && (
        <DetailModal
        portalId= "portal"
        title="Detalle"
        data= {data}
        labels= {labelsDetails}
        onCloseModal={handleToggleModal}
        />
      )}
    </>
  );
};

export { DetailsConfirmInitiated }

