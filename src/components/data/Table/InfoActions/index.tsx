import { useState } from "react";
import { MdInfoOutline } from "react-icons/md";
import { Icon } from "@inubekit/inubekit";
import { IInfoModal } from "@components/modals/InfoModal/types";
import { InfoModal } from "@components/modals/InfoModal";

interface InfoActionsProps {
  data: IInfoModal[];
}

const InfoActions = (props: InfoActionsProps) => {
  const { data } = props;
  const [showModal, setShowModal] = useState(false);

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <Icon
        appearance="primary"
        icon={<MdInfoOutline />}
        size="24px"
        onClick={handleToggleModal}
      />
      {showModal && (
        <InfoModal infoData={data} onCloseModal={handleToggleModal} />
      )}
    </>
  );
};

export { InfoActions };
export type { InfoActionsProps };
