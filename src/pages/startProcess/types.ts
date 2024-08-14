import { IActions } from "@src/components/feedback/CardProcess/types";

interface FilterProcessesForDate {
  executionDate: string;
  month: string;
  year: string;
}

interface StartProcesses {
  id: string;
  description: string;
  date: string | Date | undefined;
  dateAndHour?: string | Date;
  aplication?: string;
  periodicity?: string;
  statusText?: string;
  status?: React.ReactNode;
  actions?: IActions[];
  totalPersons?: number;
  totalPersonsProsecuted?: number;
  totalPersonsCoversProcess?: number;
  duration?: number;
}

interface StartProcessesFilter {
  onDemand: StartProcesses[];
  scheduled: StartProcesses[];
}

interface IChangePeriodEntry {
  month: string;
  year: string;
  change?: boolean;
}

export type {
  FilterProcessesForDate,
  StartProcesses,
  StartProcessesFilter,
  IChangePeriodEntry,
};
