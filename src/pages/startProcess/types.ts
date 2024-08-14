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

interface IStartProcessesRequest {
  processCatalogId: string;
  month: number;
  suggestedDescription: string;
  year: number;
  cutOffDate: string;
  typeRefresh: string;
  complementaryDescription?: string;
  plannedExecutionDate?: string;

}

interface IStartProcessResponse {
  confirmationForExecutionOfTheProcess: string;
  executionDate: string;
  executionParameters: string;
  generalError: string;
  plannedExecution: string;
  plannedExecutionDate: string;
  processCatalogId: string;
  processControlId: string;
  processDescription: string;
  processStatus: string;
  uniqueReferenceNumberRequirement: string;
}



export type {
  FilterProcessesForDate,
  StartProcesses,
  StartProcessesFilter,
  IChangePeriodEntry,
  IStartProcessesRequest,
  IStartProcessResponse,
};
