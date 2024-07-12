import { useEffect, useState } from "react";

import { IChangePeriodEntry } from "@components/modals/ChangePeriodModal/types";
import {
  currentMonthLetters,
  currentYear,
  filterDateChange,
} from "@utils/dates";
import { startProcessData } from "@services/startProcess/getStartProcess";
import { OnDemandTabUI } from "./interface";
import { FilterProcessesForDate, IStartProcessesData } from "../../types";

import { orderData } from "../../utils";



function OnDemandTab() {
  const [searchOnDemand, setSearchOnDemand] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [orderAscending, setOrderAscending] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<IChangePeriodEntry>({
    month: "",
    year: "",
  });

  const [onDemand, setOnDemand] = useState<IStartProcessesData[]>([]);

  const handleOrderData = () => {
    setOrderAscending(!orderAscending);
    orderData(onDemand, orderAscending);
    setOnDemand(onDemand);
  };

  const validateOnDemand = async (
    filterDateChange: FilterProcessesForDate
  ) => {
    setLoading(true);
    try {
      const newOnDemand = await startProcessData(filterDateChange);
      console.log(newOnDemand); 
      setOnDemand(
        newOnDemand.onDemand
      );
    } catch (error) {
      console.info(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    validateOnDemand(filterDateChange(selectedDate));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (selectedDate.change === true) {
      validateOnDemand(filterDateChange(selectedDate));
    }
  }, [selectedDate]);

  const handlesearchOnDemand = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchOnDemand(e.target.value);
  };

  return (
    <OnDemandTabUI
      entries={onDemand}
      loading={loading}
      description={`Procesos de mes de ${selectedDate.month || currentMonthLetters!} 
          de ${selectedDate.year || currentYear} para inciar su ejecucion`}
      handlesearchOnDemand={handlesearchOnDemand}
      handleOrderData={handleOrderData}
      selectedMonth={selectedDate.month || currentMonthLetters!}
      selectedYear={selectedDate.year || currentYear}
      searchOnDemand={searchOnDemand}
      setSelectedDate={setSelectedDate}
    />
  );
}

export { OnDemandTab };
