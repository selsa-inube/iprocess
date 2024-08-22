import { useState } from "react";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { Icon } from "@inubekit/icon";

import { IActions } from "@components/data/Table/props";
import { tokens } from "@src/design/tokens";

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
        size={tokens.spacing.s200}
        onClick={handleToggleModal}
        cursorHover
        spacing="narrow"
      />
      {showModal && data && (
        <></>
      )}
    </>
  );
};

export { DetailsOnDemand }
