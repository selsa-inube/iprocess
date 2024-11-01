import { useEffect, useState } from "react";

import {
  currentMonthLetters,
  currentYear,
  formatDateEndpoint,
  filterDateForMonthAndYear,
  formatMonthEndpoint,
} from "@utils/dates";
import { listPeriodsToProcessInitiated } from "@services/validateProgress/getPeriodsToProcessInitiated";
import { finishedData } from "@services/finished";
import { FinishedUI } from "./interface";
import {
  IChangePeriodEntry,
  IListPeriods,
  StartProcesses,
} from "../startProcess/types";
import { IFilterDateForMonthAndYear } from "../validateProgress/types";


function Finished() {
  const [searchFinished, setSearchFinished] =
    useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const [finished, setFinished] = useState<StartProcesses[]>(
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
      const newValidateProcess = await finishedData(date);

      setFinished(newValidateProcess);
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

  const handleSearchFinished = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchFinished(e.target.value);
  };

  return (
    <FinishedUI
      entries={finished}
      isLoading={loading}
      month={selectedPeriod.month || currentMonthLetters!}
      year={selectedPeriod.year || currentYear}
      handleSearchFinished={handleSearchFinished}
      searchFinished={searchFinished}
      setSelectedPeriod={setSelectedPeriod}
      listOfPeriods={listPeriod}
    />
  );
}

export { Finished };
