import { useState } from "react";
import { MdPinInvoke } from "react-icons/md";
import { Icon } from "@inubekit/icon";

import { StartProcessModal } from "@components/modals/StartProcessModal";
import { IEntries } from "@components/modals/MoreDetailsModal/types";
import { formatMonthEndpoint } from "@src/utils/dates";

import { RefreshSavingProduct } from "@src/forms/savings/RefreshSavingProduct";
import { startProcessAction } from "./utils";
import { IFieldsEntered } from "@src/forms/types";
import { tokens } from "@src/design/tokens";

interface IStartProcessScheduledProps {
  id: string;
  selectedMonth: string;
  selectedYear: string;
  dataModal: IEntries;
}

const StartProcessScheduled = (props: IStartProcessScheduledProps) => {
  const { dataModal, id, selectedMonth, selectedYear } = props;
  const [fieldsEntered, setFieldsEntered] = useState<IFieldsEntered>(
    {} as IFieldsEntered
  );

  const [showModal, setShowModal] = useState(false);

  const formatCutOffDate = new Date(String(dataModal.dateWithoutFormat));

  const handleStartProcess = () => {
    const data = startProcessAction({
      processCatalogId: String(id),
      month: Number(formatMonthEndpoint(selectedMonth)),
      suggestedDescription: String(dataModal.descriptionSuggested),
      year: Number(selectedYear),
      cutOffDate: String(formatCutOffDate.toLocaleDateString("en-CA")),
      complementaryDescription: String(fieldsEntered.descriptionComplementary),
      typeRefresh: String(fieldsEntered.typeRefresh),
      plannedExecutionDate: String(fieldsEntered.plannedExecutionDate),

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
        size={tokens.spacing.s200}
        onClick={handleToggleModal}
        cursorHover
        spacing="narrow"
      />
      {showModal && dataModal && (
        <StartProcessModal portalId="portal" onCloseModal={handleToggleModal}>
          <RefreshSavingProduct
            data={{
              id: id,
              descriptionSuggested: dataModal?.descriptionSuggested,
              date: dataModal?.date,
              plannedAutomaticExecution: dataModal?.plannedAutomaticExecution,
            }}
            onStartProcess={handleStartProcess}
            setFieldsEntered={setFieldsEntered}
          />
        </StartProcessModal>
      )}
    </>
  );
};

export { StartProcessScheduled };
