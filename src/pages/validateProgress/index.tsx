import { useEffect, useState } from "react";

import {
  currentMonthLetters,
  currentYear,
  formatDateEndpoint,
  filterDateForMonthAndYear,
  formatMonthEndpoint,
} from "@utils/dates";
import { listPeriodsToProcessInitiated } from "@services/validateProgress/getPeriodsToProcessInitiated";
import { validateProgressData } from "@services/validateProgress/getValidateProgress";
import { ValidateProgressUI } from "./interface";
import {
  IChangePeriodEntry,
  IListPeriods,
  StartProcesses,
} from "../startProcess/types";
import { IFilterDateForMonthAndYear } from "./types";

function ValidateProgress() {
  const [searchValidateProgress, setSearchValidateProgress] =
    useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const [validateProgress, setValidateProgress] = useState<StartProcesses[]>(
    []
  );
  const [selectedPeriod, setSelectedPeriod] = useState<IChangePeriodEntry>({
    month: "",
    year: "",
  });

  const [listPeriod, setListPeriod] = useState<IListPeriods[]>([]);

  const validatePeriod = async () => {
    try {
      const newPeriod = await listPeriodsToProcessInitiated(
        formatDateEndpoint(new Date())
      );
      setListPeriod(newPeriod);
    } catch (error) {
      console.info(error);
    }
  };

  const validateProgressProcess = async (date: IFilterDateForMonthAndYear) => {
    setLoading(true);
    try {
      const newValidateProcess = await validateProgressData(date);

      setValidateProgress(newValidateProcess);
    } catch (error) {
      console.info(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    validateProgressProcess(
      filterDateForMonthAndYear(
        formatMonthEndpoint(selectedPeriod.month),
        Number(selectedPeriod.year)
      )
    );
    validatePeriod();
  }, []);

  useEffect(() => {
    if (selectedPeriod.change === true) {
      validateProgressProcess(
        filterDateForMonthAndYear(
          formatMonthEndpoint(selectedPeriod.month),
          Number(selectedPeriod.year)
        )
      );
    }
  }, [selectedPeriod]);

  const handleSearchValidateProgress = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
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
