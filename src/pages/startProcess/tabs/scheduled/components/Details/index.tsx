import { useState } from "react";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { Icon } from "@inubekit/icon";

import { IActions } from "@components/data/Table/props";
import { DetailModal } from "@components/modals/DetailModal";
import { labelsDetails } from "../../config/table.config";
import { tokens } from "@src/design/tokens";


interface IDetailsProps {
  data: IActions;
}

export const Details = (props: IDetailsProps) => {
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
        size={tokens.spacing.s200}
        onClick={handleToggleModal}
        cursorHover
        spacing="narrow"
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

