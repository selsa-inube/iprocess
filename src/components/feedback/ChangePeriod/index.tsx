import { useState } from "react";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { Button } from "@inubekit/button";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";

import { ChangePeriodModal } from "@components/modals/ChangePeriodModal";
import { IChangePeriodEntry } from "@components/modals/ChangePeriodModal/types";
import { StyledButton } from "./styles";

interface ChangePeriodProps {
  description: string;
  laterYears: number;
  previousYears: number;
  selectedMonth: string;
  selectedYear: string;
  setSelectedDate: (show: IChangePeriodEntry) => void;
}

const ChangePeriod = (props: ChangePeriodProps) => {
  const { description, laterYears, previousYears,  selectedMonth,
    selectedYear, setSelectedDate } = props;

  const [showModal, setShowModal] = useState(false);

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <Stack gap="20px" alignItems="center">
      <Text type="label" size="medium" appearance="dark">
        {description}
      </Text>
      <StyledButton>
        <Button
          onClick={() => setShowModal(true)}
          iconBefore={<MdOutlineCalendarMonth size={"18px"} />}
        >
          Modificar mes
        </Button>
      </StyledButton>

      {showModal && (
        <ChangePeriodModal
          laterYears={laterYears}
          previousYears={previousYears}
          portalId={"modals"}
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
          onCloseModal={handleToggleModal}
          selectedDate={setSelectedDate}
        />
      )}
    </Stack>
  );
};

export { ChangePeriod };
