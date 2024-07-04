import { useEffect, useState } from "react";

import { startProcessData } from "@services/startProcess/getStartProcess";
import { IChangeDateEntry } from "@components/modals/ChangeDateModal/types";
import { filterDateChange, MonthLetters } from "@utils/dates";

import { ScheduledTabUI } from "./interface";
import { orderData } from "../../utils";
import { FilterProcessesForDate, StartProcesses } from "../../types";


function ScheduledTab() {
  const [searchScheduled, setSearchScheduled] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [orderAscending, setOrderAscending] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<IChangeDateEntry>({
    month: "",
    year: "",
  });

  const [scheduled, setScheduled] = useState<StartProcesses[]>([]);

  const handleOrderData = () => {
    setOrderAscending(!orderAscending);
    orderData(scheduled, orderAscending);
    setScheduled(scheduled);
  };


  const validateScheduled = async (filterDateChange: FilterProcessesForDate) => {
    setLoading(true);
    try {
      const newScheduled = await startProcessData(filterDateChange);
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
    if (selectedDate.active === true) {
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
      selectedMonth={selectedDate.month ||  MonthLetters!}
      handleSearchScheduled={handleSearchScheduled}
      handleOrderData={handleOrderData}
      searchScheduled={searchScheduled}
      setSelectedDate={setSelectedDate}
    />
  );
}

export { ScheduledTab };
