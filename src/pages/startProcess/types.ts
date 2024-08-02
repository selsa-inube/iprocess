interface FilterProcessesForDate {
  executionDate: string;
  month: string;
  year: string;
}

interface StartProcesses {
  id: string;
  processCatalogId: string;
  abbreviatedName: string;
  executionDate: Date;
  executionDateAndHour?: Date;
  requeriments?: string;
  aplication?: string;
  periodicity?: string;
  plannedAutomaticExecution?: string;
  executionDateWithoutFormat?: string;
}

interface StartProcessesFilter {
  onDemand: StartProcesses[];
  scheduled: StartProcesses[];
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
  IStartProcessesRequest,
  IStartProcessResponse,
};
