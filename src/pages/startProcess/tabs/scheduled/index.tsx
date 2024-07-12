import { useEffect, useState } from "react";

import { startProcessData } from "@services/startProcess/getStartProcess";
import { IChangePeriodEntry } from "@components/modals/ChangePeriodModal/types";
import {
  filterDateChange,
  currentMonthLetters,
  currentYear,
} from "@utils/dates";

import { ScheduledTabUI } from "./interface";
import { orderData } from "../../utils";
import { FilterProcessesForDate, IStartProcessesData } from "../../types";

function ScheduledTab() {
  const [searchScheduled, setSearchScheduled] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [orderAscending, setOrderAscending] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<IChangePeriodEntry>({
    month: "",
    year: "",
  });

  const [scheduled, setScheduled] = useState<IStartProcessesData[]>([]);

  const handleOrderData = () => {
    setOrderAscending(!orderAscending);
    orderData(scheduled, orderAscending);
    setScheduled(scheduled);
  };

  const validateScheduled = async (
    filterDateChange: FilterProcessesForDate
  ) => {
    setLoading(true);
    try {
      const newScheduled = await startProcessData(filterDateChange);

      setScheduled(newScheduled.scheduled);
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
    <ScheduledTabUI
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

export { ScheduledTab };
