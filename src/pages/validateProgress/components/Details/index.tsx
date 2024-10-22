import { MdOutlineRemoveRedEye } from "react-icons/md";
import { useState } from "react";
import { Icon } from "@inubekit/icon";

import { IEntries } from "@forms/types";
import { tokens } from "@design/tokens";
import { DetailModal } from "@components/modals/DetailModal";
import { labelsDetails } from "../../config/card.config";

interface DetailsProps {
  data: IEntries;
}

const Details = (props: DetailsProps) => {
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
      {showModal && (
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

export { Details };
