interface FilterProcessesForDate {
  executionDate: string;
  month: string;
  year: string;
}

interface IStartProcessesData {
  id: string;
  abbreviatedName: string;
  executionDate: Date;
  processCatalogId?: string;
  executionDateAndHour?: Date;
  requeriments?: string;
  aplication?: string;
  periodicity?: string;
}

interface StartProcessesFilter {
  onDemand: IStartProcessesData[];
  scheduled: IStartProcessesData[];
}

interface IStartProcessesRequest {
  processCatalogId: string;
  month: number;
  suggestedDescription: string;
  year: number;
  cutOffDate: string;
  complementaryDescription?: string;
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
  StartProcessesFilter,
  IStartProcessesRequest,
  IStartProcessResponse,
  IStartProcessesData,
};
