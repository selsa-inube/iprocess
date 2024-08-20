import { useEffect, useState } from "react";

import {
  currentMonthLetters,
  currentYear,
  filterDateChange,
} from "@utils/dates";
import { startProcessData } from "@services/startProcess/getStartProcess";
import { OnDemandTabUI } from "./interface";
import {
  FilterProcessesForDate,
  IChangePeriodEntry,
  StartProcesses,
} from "../../types";

function OnDemandTab() {
  const [searchOnDemand, setSearchOnDemand] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const [onDemand, setOnDemand] = useState<StartProcesses[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState<IChangePeriodEntry>({
    month: "",
    year: "",
  });

  const validateOnDemand = async (filterDateChange: FilterProcessesForDate) => {
    setLoading(true);
    try {
      const newOnDemand = await startProcessData(filterDateChange);
      setOnDemand(newOnDemand.onDemand);
    } catch (error) {
      console.info(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    validateOnDemand(
      filterDateChange({ month: currentMonthLetters!, year: currentYear })
    );
  }, []);

  useEffect(() => {
    if (selectedPeriod.change === true) {
      validateOnDemand(filterDateChange(selectedPeriod));
    }
  }, [selectedPeriod]);

  const handlesearchOnDemand = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchOnDemand(e.target.value);
  };

  return (
    <OnDemandTabUI
      entries={onDemand}
      isLoading={loading}
      description={`Procesos del mes de ${selectedPeriod.month || currentMonthLetters!} ${selectedPeriod.year || currentYear}`}
      handlesearchOnDemand={handlesearchOnDemand}
      searchOnDemand={searchOnDemand}
      setSelectedPeriod={setSelectedPeriod}
    />
  );
}

export { OnDemandTab };
