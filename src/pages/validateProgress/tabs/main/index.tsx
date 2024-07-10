import { useEffect, useState } from "react";

import { validateProgressData } from "@services/validateProgress/getValidateProgress";

import { IChangePeriodEntry } from "@components/modals/ChangePeriodModal/types";
import {
  filterDateChange,
  currentMonthLetters,
  currentYear,
} from "@utils/dates";

import { MainTabUI } from "./interface";

import { orderData } from "../../utils";
import { FilterProgressForDate, ValidateProgresses } from "../../types";


function MainTab() {
  const [searchScheduled, setSearchScheduled] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [orderAscending, setOrderAscending] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<IChangePeriodEntry>({
    month: "",
    year: "",
  });

  const [scheduled, setScheduled] = useState<ValidateProgresses[]>([]);

  const handleOrderData = () => {
    setOrderAscending(!orderAscending);
    orderData(scheduled, orderAscending);
    setScheduled(scheduled);
  };

  const validateScheduled = async (
    filterDateChange: FilterProgressForDate
  ) => {
    setLoading(true);
    try {
      const newScheduled = await validateProgressData(filterDateChange);
      setScheduled(newScheduled);
    } catch (error) {
      console.info(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    validateScheduled(filterDateChange(selectedDate));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (selectedDate.change === true) {
      validateScheduled(filterDateChange(selectedDate));
    }
  }, [selectedDate]);

  const handleSearchScheduled = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchScheduled(e.target.value);
  };

  return (
    <MainTabUI
      entries={scheduled}
      loading={loading}
      description={`Procesos de mes de ${selectedDate.month || currentMonthLetters!} 
        de ${selectedDate.year || currentYear} para inciar su ejecucion`}
      handleSearchScheduled={handleSearchScheduled}
      handleOrderData={handleOrderData}
      selectedMonth={selectedDate.month || currentMonthLetters!}
  selectedYear={selectedDate.year || currentYear}
      searchScheduled={searchScheduled}
      setSelectedDate={setSelectedDate}
    />
  );
}

export { MainTab };
