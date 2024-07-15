import { useState } from "react";
import { MdPinInvoke } from "react-icons/md";
import { Icon } from "@inubekit/icon";

import { StartProcessModal } from "@components/modals/StartProcessModal";
import { IEntries } from "@components/modals/MoreDetailsModal/types";
import { formatMonthEndpoint } from "@utils/dates";

import { startProcessAction } from "./utils";
import { labelsStartProcess } from "../../config/table.config";

interface IStartProcessScheduledProps {
  id: string;
  selectedMonth: string;
  selectedYear: string;
  dataModal: IEntries;
}

const StartProcessScheduled = (props: IStartProcessScheduledProps) => {
  const { dataModal, id, selectedMonth, selectedYear } = props;
  const [descriptionComplementary, setDescriptionComplementary] =
    useState<string>("");

  const [showModal, setShowModal] = useState(false);

  const formatCutOffDate = new Date(String(dataModal.dateWithoutFormat));

  const handleStartProcess = () => {
    const data = startProcessAction({
      processCatalogId: String(id),
      month: Number(formatMonthEndpoint(selectedMonth)),
      suggestedDescription: String(dataModal.descriptionSuggested),
      year: Number(selectedYear),
      cutOffDate: String(formatCutOffDate.toLocaleDateString("en-CA")),
      complementaryDescription: String(descriptionComplementary),
    });

    data.then().catch();
  };

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <Icon
        appearance="dark"
        icon={<MdPinInvoke />}
        size="16px"
        onClick={handleToggleModal}
        cursorHover
        spacing="none"
      />
      {showModal && dataModal && (
        <StartProcessModal
          portalId="portal"
          data={dataModal}
          labels={labelsStartProcess}
          onCloseModal={handleToggleModal}
          handleStartProcess={handleStartProcess}
          setDescriptionComplementary={setDescriptionComplementary}
        />
      )}
    </>
  );
};

export { StartProcessScheduled };
