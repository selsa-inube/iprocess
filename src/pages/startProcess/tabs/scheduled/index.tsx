import { useEffect, useState } from "react";
import { startProcessData } from "@services/startProcess/getStartProcess";
import {
  filterDateChange,
  currentMonthLetters,
  currentYear,
  formatDateEndpoint,
} from "@utils/dates";
import { listPeriodsStartProcess } from "@services/startProcess/getPeriodsToStartProcess";
import { ScheduledTabUI } from "./interface";
import {
  IChangePeriodEntry,
  FilterProcessesForDate,
  StartProcesses,
  IListPeriods,
} from "../../types";

function ScheduledTab() {
  const [searchScheduled, setSearchScheduled] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const [scheduled, setScheduled] = useState<StartProcesses[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState<IChangePeriodEntry>({
    month: "",
    year: "",
  });

  const [listPeriod, setListPeriod] = useState<IListPeriods[]>([]);

  const [status, setStatus] = useState<string>("");

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

  const validatePeriod = async () => {
    try {
      const newPeriod = await listPeriodsStartProcess(formatDateEndpoint(new Date()));
      setListPeriod(newPeriod);
    } catch (error) {
      console.info(error);
  }}

  useEffect(() => {
    validatePeriod()
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
      status={status}
      setStatus={setStatus}
      listOfPeriods={listPeriod}
    />
  );
}

export { ScheduledTab };
