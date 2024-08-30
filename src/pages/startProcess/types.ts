import { IActions } from "@components/feedback/CardProcess/types";

interface FilterProcessesForDate {
  executionDate: string;
  month: string;
  year: string;
}

interface StartProcesses {
  id: string;
  publicCode: string;
  description: string;
  date?: Date | string | undefined;
  dateAndHour?: Date;
  aplication?: string;
  periodicity?: string;
  statusText?: string;
  status?: React.ReactNode;
  dailyDetail?: IDailyDetail[];
  actions?: IActions[];
  month?: number;
  year?: number;
  plannedAutomaticExecution?: string;
  dateWithoutFormat?: string;
}


interface StartProcessesFilter {
  onDemand: StartProcesses[];
  scheduled: StartProcesses[];
}

interface IDailyDetail{
  processCatalogId: string;
  aplication: string;
  publicCode: string;
  abbreviatedName: string;
  estimatedExecutionDate: Date;
  requirements: string;
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
