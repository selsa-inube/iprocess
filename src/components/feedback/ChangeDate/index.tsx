import { useState } from "react";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { Button } from "@inubekit/button";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";

import { ChangeDateModal } from "@components/modals/ChangeDateModal";
import { IChangeDateEntry } from "@components/modals/ChangeDateModal/types";

interface ChangeDateProps {
  setSelectedDate: (show: IChangeDateEntry) => void;
  selectedMonth: string;
}

const ChangeDate = (props: ChangeDateProps) => {
  const { setSelectedDate, selectedMonth } = props;

  const [showModal, setShowModal] = useState(false);

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <Stack gap="20px" alignItems="center">
      <Text type="title" size="medium" appearance="dark">
        {`Procesos del mes de ${selectedMonth}`}
      </Text>

      <Button
        onClick={() => setShowModal(true)}
        iconBefore={<MdOutlineCalendarMonth size={"18px"} />}
      >
        Cambiar mes
      </Button>
      {showModal && (
        <ChangeDateModal
          laterYears={1}
          previousYears={3}
          portalId={"modals"}
          onCloseModal={handleToggleModal}
          selectedDate={setSelectedDate}
        />
      )}
    </Stack>
  );
};

export { ChangeDate };
