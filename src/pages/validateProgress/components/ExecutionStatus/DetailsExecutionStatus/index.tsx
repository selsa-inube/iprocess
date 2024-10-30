import { useState } from "react";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { Icon } from "@inubekit/icon";

import { DetailModal } from "@components/modals/DetailModal";
import { tokens } from "@design/tokens";
import { IPersonProcess } from "@components/feedback/CardStatusExecution/types";
import { labelsDetails } from "../config/cardPerson.config";

interface IDetailsExecutionStatusProps {
  data: IPersonProcess;
}

const DetailsExecutionStatus = (props: IDetailsExecutionStatusProps) => {
  const {
    data,
  } = props;

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
          portalId="portal"
          title="Detalle"
          data={data}
          labels={labelsDetails}
          onCloseModal={handleToggleModal}
        />
      )}
    </>
  );
};

export { DetailsExecutionStatus };
