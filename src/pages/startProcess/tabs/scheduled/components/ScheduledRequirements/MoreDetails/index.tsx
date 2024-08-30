import { useState } from "react";
import { MdAddCircleOutline } from 'react-icons/md';
import { Icon } from "@inubekit/icon";

import { IActions } from "@components/data/Table/props";
import { MoreDetailsModal } from "@components/modals/MoreDetailsModal";
import { labelsMoreDetails } from "../config/tablesRequirements.config";

interface MoreDetailsProps {
  data: IActions;
}

const MoreDetails = (props: MoreDetailsProps) => {
  const { data } = props;

  const [showModal, setShowModal] = useState(false);

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <Icon
        appearance="dark"
        icon={<MdAddCircleOutline />}
        size="16px"
        onClick={handleToggleModal}
        cursorHover
      />
      
      {showModal && data && (
        <MoreDetailsModal
        portalId="portal"
        data={data}
        labels={labelsMoreDetails}
        onCloseModal={handleToggleModal}
        />
      )}
    </>
  );
};

export { MoreDetails }
