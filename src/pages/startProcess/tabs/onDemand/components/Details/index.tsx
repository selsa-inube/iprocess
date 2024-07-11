import { useState } from "react";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { Icon } from "@inubekit/icon";

import { IActions } from "@components/data/Table/props";
import { DetailModal } from "@components/modals/DetailModal";
import { labelsDetailsOnDemand } from "../../config/table.config";

interface IDetailsOnDemandProps {
  data: IActions;
}

const DetailsOnDemand = (props: IDetailsOnDemandProps) => {
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
        labels= {labelsDetailsOnDemand}
        onCloseModal={handleToggleModal}
        />
      )}
    </>
  );
};

export { DetailsOnDemand }
