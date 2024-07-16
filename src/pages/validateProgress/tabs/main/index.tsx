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
  const [searchMain, setSearchMain] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [orderAscending, setOrderAscending] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<IChangePeriodEntry>({
    month: "",
    year: "",
  });

  const [main, setMain] = useState<ValidateProgresses[]>([]);

  const handleOrderData = () => {
    setOrderAscending(!orderAscending);
    orderData(main, orderAscending);
    setMain(main);
  };

  const validateMain = async (
    filterDateChange: FilterProgressForDate
  ) => {
    setLoading(true);
    try {
      const newMain = await validateProgressData(filterDateChange);
      setMain(newMain);
    } catch (error) {
      console.info(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    validateMain(filterDateChange(selectedDate));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (selectedDate.change === true) {
      validateMain(filterDateChange(selectedDate));
    }
  }, [selectedDate]);

  const handleSearchMain = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchMain(e.target.value);
  };

  return (
    <MainTabUI
      entries={main}
      loading={loading}
      description={`Procesos del mes de ${selectedDate.month || currentMonthLetters!} 
        de ${selectedDate.year || currentYear}`}
      handleSearchMain={handleSearchMain}
      handleOrderData={handleOrderData}
      selectedMonth={selectedDate.month || currentMonthLetters!}
      selectedYear={selectedDate.year || currentYear}
      searchMain={searchMain}
      setSelectedDate={setSelectedDate}
    />
  );
}

export { MainTab };
