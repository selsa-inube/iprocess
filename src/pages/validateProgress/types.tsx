interface IFilterDateForMonthAndYear {
  startDate: string;
  endDate: string;
}

interface IProcessErrors {
  errorDescription: string;
  errorStatus: string;
  procesErrorId: string;
  processControlId: string;
  processPersonId: string;
}

interface IProcessPersons {
  executionStatusByPerson: string;
  finishDate: string;
  personName: string;
  personPublicCode: string;
  processControlId: string;
  processErrors: IProcessErrors[];
  processPersonId: string;
  startDate: string;
}

interface IExecutionParameters {
  [key: string]: string;
}

interface IpeopleIncludedInTheProcess {
  confirmationForExecutionOfTheProcess: string;
  plannedExecution: string;
  processCatalogId: string;
  processControlId: string;
  processPersons: IProcessPersons[];
  timeUsedToInsertPeople: number;
  uniqueReferenceNumberRequirement: string;
  executionDate?: string;
  executionParameters?: IExecutionParameters;
  generalError?: string;
  processDescription?: string;
  processStatus?: string;
}

interface IPersonProcessTime {
  totalPersons: number;
  totalProcessedPersons: number;
  duration: string;
  totalProcessedPersonsWithError: number;
  processStartDate: string;
  processEstimatedEndDate: string;
}

export type {
  IFilterDateForMonthAndYear,
  IpeopleIncludedInTheProcess,
  IProcessPersons,
  IPersonProcessTime,
};
