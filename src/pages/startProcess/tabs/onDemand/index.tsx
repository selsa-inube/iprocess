import { useContext, useEffect, useState } from "react";

import {
  currentMonthLetters,
  currentYear,
  filterDateChange,
} from "@utils/dates";
import { AppContext } from "@context/AppContext";
import { startProcessData } from "@services/startProcess/getStartProcess";
import { OnDemandTabUI } from "./interface";
import { FilterProcessesForDate, StartProcesses } from "../../types";

function OnDemandTab() {
  const { appData } = useContext(AppContext)
  const [searchOnDemand, setSearchOnDemand] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const [onDemand, setOnDemand] = useState<StartProcesses[]>([]);

  const [status, setStatus] = useState<string>("");

  const validateOnDemand = async (filterDateChange: FilterProcessesForDate) => {
    setLoading(true);
    try {
      const newOnDemand = await startProcessData(appData.businessUnit.publicCode, filterDateChange);
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

  const handlesearchOnDemand = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchOnDemand(e.target.value);
  };

  return (
    <OnDemandTabUI
      entries={onDemand}
      isLoading={loading}
      handlesearchOnDemand={handlesearchOnDemand}
      month={currentMonthLetters!}
      year={currentYear}
      searchOnDemand={searchOnDemand}
      status={status}
      setStatus={setStatus}
    />
  );
}

export { OnDemandTab };
