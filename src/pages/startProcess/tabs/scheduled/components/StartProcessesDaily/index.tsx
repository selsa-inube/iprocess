import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { startProcessData } from "@services/startProcess/getStartProcess";
import {
  FilterProcessesForDate,
  IDailyDetail,
  StartProcesses,
} from "@pages/startProcess/types";
import { filterDateChange, formatMonthEndpoint } from "@utils/dates";
import { orderData } from "./utils";
import { StartProcessesDailyUI } from "./interface";

function StartProcessesDaily() {
  const [searchProcessesDaily, setSearchProcessDaily] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [orderAscending, setOrderAscending] = useState<boolean>(false);
  const [processesDaily, setProcessesDaily] = useState<StartProcesses[]>([]);
  const [entriesDetailsDaily, setEntriesDetailsDaily] = useState<
    IDailyDetail[]
  >([]);
  const [status, setStatus]= useState<string>("");

  const { month, year, process_id } = useParams();

  const validateProcessesDaily = async (
    filterDateChange: FilterProcessesForDate
  ) => {
    setLoading(true);
    try {
      const newScheduled = await startProcessData(filterDateChange);

      const processesDaily = newScheduled.scheduled.filter(
        (process) => process.id === process_id
      );
      setProcessesDaily(processesDaily);
    } catch (error) {
      console.info(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    validateProcessesDaily(
      filterDateChange({
        month: month || "",
        year: year || "",
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    processesDaily.length > 0 &&
      setEntriesDetailsDaily(
        processesDaily.find((entry) => entry)?.dailyDetail || []
      );
  }, [processesDaily]);

  const handleSearchProcessDaily = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchProcessDaily(e.target.value);
  };

  const handleOrderData = () => {
    setOrderAscending(!orderAscending);
    orderData(entriesDetailsDaily, orderAscending);
    setEntriesDetailsDaily(entriesDetailsDaily);
  };

  return (
    <StartProcessesDailyUI
      descriptionProcess={processesDaily[0]?.description || ""} 
      entries={entriesDetailsDaily}
      loading={loading}
      month={formatMonthEndpoint(month!)}
      searchProcessDaily={searchProcessesDaily}
      status={status}
      year={Number(year)}
      handleOrderData={handleOrderData}
      OnSearchProcessDaily={handleSearchProcessDaily}
      setStatus={setStatus}
    />
  );
}

export { StartProcessesDaily };
