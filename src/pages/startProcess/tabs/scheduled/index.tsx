import { useEffect, useState } from "react";

import { startProcessData } from "@services/startProcess/getStartProcess";

import {
  filterDateChange,
  currentMonthLetters,
  currentYear,
} from "@utils/dates";

import { ScheduledTabUI } from "./interface";
import { orderData } from "../../utils";
import { FilterProcessesForDate, StartProcesses } from "../../types";


function ScheduledTab() {
  const [searchScheduled, setSearchScheduled] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [orderAscending, setOrderAscending] = useState<boolean>(false);
  

  const [scheduled, setScheduled] = useState<StartProcesses[]>([]);

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
    validateScheduled(filterDateChange({ month: currentMonthLetters!, year: currentYear }));
  }, []);

  const handleSearchScheduled = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchScheduled(e.target.value);
  };

  return (
    <ScheduledTabUI
      entries={scheduled}
      loading={loading}
      description={`Procesos de mes de ${ currentMonthLetters!} 
        de ${currentYear} para inciar su ejecucion`}
      handleSearchScheduled={handleSearchScheduled}
      handleOrderData={handleOrderData}
      searchScheduled={searchScheduled}

    />
  );
}

export { ScheduledTab };
