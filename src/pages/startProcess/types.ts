import { IActions } from "@components/feedback/CardProcess/types";
import { IProcessRequirementResponse } from "@ptypes/statusRequeriments.types";

export const appearance = [
  "primary",
  "success",
  "warning",
  "danger",
  "help",
  "dark",
  "gray",
  "light",
] as const;

interface FilterProcessesForDate {
  month: string;
  year: string;
  executionDate?: string;
}

interface IAplication {
  appId: string;
  abbreviatedName: string;
  publicCode: string;

}

interface StartProcesses {
  id: string;
  description: string;
  publicCode?: string;
  date?: Date | string | undefined;
  dateAndHour?: Date;
  aplication?: IAplication;
  periodicity?: string;
  statusText?: string;
  status?: React.ReactNode;
  dailyDetail?: IDailyDetail[];
  actions?: IActions[];
  month?: number;
  year?: number;
  executionWay?: string;
  dateWithoutFormat?: string;
  estimatedExecutionDate?: string;
  url?: string;
  totalPerson?: number;
  referenceNumberRequirement?: string;
  timeUsedToInsertPeople?: number;
  executionParameters?: IExecutionParameters;
  generalError?: string;
  plannedExecutionDate?: string;
  executionOfTheProcess?: string;
  processControlId?: string;
}

interface StartProcessesFilter {
  onDemand: StartProcesses[];
  scheduled: StartProcesses[];
}

interface IDailyDetail {
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

interface IExecutionParameters {
  [parameter: string]: string;
}

interface IStartProcessesRequest {
  cutOffDate: string;
  month: number;
  plannedExecution: string;
  processCatalogId: string;
  publicCode: string;
  suggestedDescription: string;
  year: number;
  executionParameters: IExecutionParameters;
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

interface IAction {
  id: string;
  actionName: string;
  content: (entry: IProcessRequirementResponse) => React.ReactNode;
}

interface ITitlesRequirements {
  id: string;
  titleName: string;
  priority: number;
}

interface IEntries {
  id: string;
  [key: string]: React.ReactNode;
}

interface IData {
  id: string;
  titlesRequirements: ITitlesRequirements[];
  entriesRequirements: IEntries[];
  actionsRequirements?: IAction[];
}

interface IListPeriods {
  numberMonth: number;
  month: string;
  year: number;
}

interface ITimeEstimedCompleteProcess {
  secondsTime: number;
}

export type appearances = (typeof appearance)[number];

export type {
  FilterProcessesForDate,
  StartProcesses,
  StartProcessesFilter,
  IChangePeriodEntry,
  IStartProcessesRequest,
  IStartProcessResponse,
  IAction,
  ITitlesRequirements,
  IData,
  IDailyDetail,
  IListPeriods,
  ITimeEstimedCompleteProcess
};
