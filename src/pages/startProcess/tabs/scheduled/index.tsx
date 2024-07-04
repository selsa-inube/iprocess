import { useEffect, useState } from "react";

import { startProcessData } from "@services/startProcess/getStartProcess";

import { ScheduledTabUI } from "./interface";
import { orderData } from "../../utils";
import { FilterProcessesForDate, StartProcesses } from "../../types";
import { IChangeDateEntry } from "@src/components/modals/ChangeDateModal/types";
import { monthsData } from "@src/mocks/domains/months";

const filterDate = (selectedDate: IChangeDateEntry):FilterProcessesForDate => {
  const month = monthsData.find((x) => x.label === selectedDate.month)?.id;

  return {
    executionDate: "",
    month: month || "01",
    year: selectedDate.year || "2024",
  };
};

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

 


  const validateScheduled = async (filterDate: FilterProcessesForDate) => {
      setLoading(true);
      try {
        const newScheduled = await startProcessData(filterDate);
        setScheduled(newScheduled);
      } catch (error) {
        console.info(error);
      } finally {
        setLoading(false);
      }
  };

  useEffect(() => {
    validateScheduled(filterDate(selectedDate));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if(selectedDate.active === true){
      validateScheduled(filterDate(selectedDate));
    }  
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate]);

  const handleSearchScheduled = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchScheduled(e.target.value);
  };

  return (
    <ScheduledTabUI
      entries={scheduled}
      loading={loading}
      selectedMonth={selectedDate.month}
      handleSearchScheduled={handleSearchScheduled}
      handleOrderData={handleOrderData}
      searchScheduled={searchScheduled}
      setSelectedDate={setSelectedDate}
    />
  );
}

export { ScheduledTab };
