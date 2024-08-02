import { useEffect, useState } from "react";

import {
  currentMonthLetters,
  currentYear,
  filterDateChange,
} from "@utils/dates";
import { startProcessData } from "@services/startProcess/getStartProcess";
import { OnDemandTabUI } from "./interface";
import { FilterProcessesForDate, StartProcesses } from "../../types";

import { orderData } from "../../utils";



function OnDemandTab() {
  const [searchOnDemand, setSearchOnDemand] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [orderAscending, setOrderAscending] = useState<boolean>(false);


  const [onDemand, setOnDemand] = useState<StartProcesses[]>([]);

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
    validateOnDemand(filterDateChange({ month: currentMonthLetters!, year: currentYear }));
  }, []);

  const handlesearchOnDemand = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchOnDemand(e.target.value);
  };

  return (
    <OnDemandTabUI
      entries={onDemand}
      loading={loading}
      description={`Procesos de mes de ${currentMonthLetters!} 
          de ${currentYear} para inciar su ejecucion`}
      handlesearchOnDemand={handlesearchOnDemand}
      handleOrderData={handleOrderData}
      searchOnDemand={searchOnDemand}
    />
  );
}

export { OnDemandTab };
