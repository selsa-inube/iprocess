import { useEffect, useState } from "react";
import { startProcessData } from "@services/startProcess/getStartProcess";
import {
  filterDateChange,
  currentMonthLetters,
  currentYear,
} from "@utils/dates";

import { ScheduledTabUI } from "./interface";
import { IChangePeriodEntry, FilterProcessesForDate, StartProcesses } from "../../types";

function ScheduledTab() {
  const [searchScheduled, setSearchScheduled] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);  

  const [scheduled, setScheduled] = useState<StartProcesses[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState<IChangePeriodEntry>({
    month: "",
    year: "",
  });

  const [status, setStatus]= useState<string>("");

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
    validateScheduled(
      filterDateChange({ month: currentMonthLetters!, year: currentYear })
    );
  }, []);

  useEffect(() => {
    if (selectedPeriod.change === true) {
      validateScheduled(filterDateChange(selectedPeriod));
    }
  }, [selectedPeriod]);

  const handleSearchScheduled = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchScheduled(e.target.value);
  };

  return (
    <ScheduledTabUI
      entries={scheduled}
      isLoading={loading}
      month={selectedPeriod.month || currentMonthLetters!}
      year={selectedPeriod.year || currentYear}
      handleSearchScheduled={handleSearchScheduled}
      searchScheduled={searchScheduled}
      setSelectedPeriod={setSelectedPeriod}
      status ={status}
       setStatus={setStatus}
    />
  );
}

export { ScheduledTab };
