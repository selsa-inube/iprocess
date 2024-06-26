import { useEffect, useState } from "react";

import { startProcessData } from "@services/startProcess/getStartProcess";

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

 const filterDate:FilterProcessesForDate ={
  executionDate: "",
  month: "02",
  year: "2024",

 }

  const validateScheduled = async () => {
    if (scheduled.length === 0) {
      setLoading(true);
      try {
        const newScheduled = await startProcessData(filterDate);
        setScheduled(newScheduled);
      } catch (error) {
        console.info(error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    validateScheduled();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearchScheduled = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchScheduled(e.target.value);
  };

  return (
    <ScheduledTabUI
      entries={scheduled}
      loading={loading}
      handleSearchScheduled={handleSearchScheduled}
      handleOrderData={handleOrderData}
      searchScheduled={searchScheduled}
    />
  );
}

export { ScheduledTab };
