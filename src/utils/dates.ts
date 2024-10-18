import {
  FilterProcessesForDate,
  IChangePeriodEntry,
} from "@pages/startProcess/types";
import { monthsData } from "@mocks/domains/months";

import { capitalizeText } from "./texts";

const monthNormalize: Record<string, string> = {
  January: "Enero",
  February: "Febrero",
  March: "Marzo",
  April: "Abril",
  May: "Mayo",
  June: "Junio",
  July: "Julio",
  August: "Agosto",
  September: "Septiembre",
  October: "Octubre",
  November: "Noviembre",
  December: "Diciembre",
};

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

const formatDateEndpoint = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "UTC",
  };
  const dateString = date.toLocaleDateString("es-ES", options);

  const [day, month, year] = dateString.split("/");

  return `${year}-${month}-${day}`;
};

const today = new Date();

const formatMonthEndpoint = (month: string) => {
  const monthNumber = monthsData.find(
    (monthData) => monthData.label === month
  )?.id;
  monthNumber?.replace("0", "");

  return Number(monthNumber);
};

const formatMonth = () => {
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

const filterDateForMonthAndYear = (month: number, year: number) => {
  const monthNormalize = month ? month : formatMonth();
  const yearNormalize = year ? year : today.getFullYear();
  const startDate = formatDateEndpoint(
    new Date(yearNormalize, (monthNormalize as number) - 1, 1)
  );
  const endDate = formatDateEndpoint(
    new Date(yearNormalize, monthNormalize as number, 0)
  );

  return { startDate, endDate };
};

export {
  currentMonthLetters,
  currentYear,
  monthNormalize,
  formatMonthEndpoint,
  formatDate,
  filterDateChange,
  formatMonth,
  formatDateEndpoint,
  filterDateForMonthAndYear,
};
