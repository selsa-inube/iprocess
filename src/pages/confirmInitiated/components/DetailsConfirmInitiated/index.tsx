import { MdOutlineRemoveRedEye } from "react-icons/md";
import { useState } from "react";
import { Icon } from "@inubekit/icon";
import { tokens } from "@design/tokens";
import { ExecutionParametersModal } from "@components/modals/ExecutionParametersModal";
import { labelsDetails } from "@pages/confirmInitiated/config/card.config";
import { StartProcesses } from "@pages/startProcess/types";
import {
  breakPointsParameters,
  titlesParameters,
} from "./config/parameters.config";

interface DetailsConfirmInitiatedProps {
  data: StartProcesses;
}

const DetailsConfirmInitiated = (props: DetailsConfirmInitiatedProps) => {
  const { data } = props;
  const [showModal, setShowModal] = useState(false);


  const executionParameters = data.executionParameters
    ? Object.entries(data.executionParameters).map(([key, value], index) => ({
        id: (index + 1).toString(),
        parameter: key,
        value: value
      }))
    : [];

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
        <ExecutionParametersModal
          isVisible={false}
          portalId="portal"
          data={data}
          labels={labelsDetails}
          titlesParametersTable={titlesParameters}
          entriesParametersTable={executionParameters}
          breakPointsParametersTable={breakPointsParameters}
          onCloseModal={handleToggleModal}
        />
      )}
    </>
  );
};

export { DetailsConfirmInitiated };
