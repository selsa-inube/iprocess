
import { FilterProcessesForDate, IChangePeriodEntry } from "@pages/startProcess/types";
import { monthsData } from "@mocks/domains/months";

import { capitalizeText } from "./texts";

const formatDate = (date: Date, withTime?: boolean) => {
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  };
  const dateString = date.toLocaleDateString("es-ES", options);

  const [day, month, year] = dateString.split(" ");

  if (withTime) {
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const seconds = date.getUTCSeconds();

    const formatMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formatSeconds = seconds < 10 ? `0${seconds}` : seconds;

    const timeString = `${hours}:${formatMinutes}:${formatSeconds}`;

    return `${day}/${capitalizeText(month)}/${year} - ${timeString}`;
  }

  return `${day}/${capitalizeText(month)}/${year}`;
};

const today = new Date();

const formatMonth = () => {
  const today = new Date();
  const currentMonth = today.getMonth() + 1;
  return currentMonth < 10 ? `0${String(currentMonth)}` : String(currentMonth);
};

const currentMonthLetters = monthsData.find(
  (month) => month.id === formatMonth()
)?.label;

const currentYear = String(today.getFullYear());

const filterDateChange = (
  selectedDate: IChangePeriodEntry
): FilterProcessesForDate => {
  const month = monthsData.find(
    (month) => month.label === selectedDate.month
  )?.id;

  return {
    executionDate: "",
    month: month || formatMonth(),
    year: selectedDate.year || currentYear,
  };
};

export {
  currentMonthLetters,
  currentYear,
  formatDate,
  filterDateChange,
  formatMonth,
};
