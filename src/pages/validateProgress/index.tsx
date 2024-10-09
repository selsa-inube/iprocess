import { useEffect, useState } from "react";

import {
  currentMonthLetters,
  currentYear,
  formatDateEndpoint,
} from "@utils/dates";
import { listPeriodsToProcessInitiated } from "@services/validateProgress/getPeriodsToProcessInitiated";
import { ValidateProgressUI } from "./interface";
import { IChangePeriodEntry, IListPeriods, StartProcesses } from "../startProcess/types";



function ValidateProgress() {
  const [searchValidateProgress, setSearchValidateProgress] = useState<string>("");
  const [loading ] = useState<boolean>(true);

  const [validateProgress,] = useState<StartProcesses[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState<IChangePeriodEntry>({
    month: "",
    year: "",
  });

  const [listPeriod, setListPeriod] = useState<IListPeriods[]>([]);

  const validatePeriod = async () => {
    try {
      const newPeriod = await listPeriodsToProcessInitiated(formatDateEndpoint(new Date()));
      setListPeriod(newPeriod);
    } catch (error) {
      console.info(error);
  }}

  useEffect(() => {
    validatePeriod()
   
  }, []);


  const handleSearchValidateProgress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValidateProgress(e.target.value);
  };

  return (
    <ValidateProgressUI
      entries={validateProgress}
      isLoading={loading}
      month={selectedPeriod.month || currentMonthLetters!}
      year={selectedPeriod.year || currentYear}
      handleSearchValidateProgress={handleSearchValidateProgress}
      searchValidateProgress={searchValidateProgress}
      setSelectedPeriod={setSelectedPeriod}
      listOfPeriods={listPeriod}
    />
  );
}

export { ValidateProgress };
