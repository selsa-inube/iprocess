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

interface IDiscardPersonsWithErrorsRequest {
  processControlId: string;
  processPersonId: string;
}

interface IDiscardPersonsWithErrorsResponse {
  businessUnit: string;
  confirmationForExecutionOfTheProcess: string;
  executionDate: string;
  executionParameters: IExecutionParameters;
  generalError: string;
  plannedExecution: string;
  plannedExecutionDate: string;
  processCatalogId: string;
  processControlId: string;
  processDescription: string;
  processPersons: IProcessPersons[];
  processStatus: string;
  timeUsedToInsertPeople: number;
  uniqueReferenceNumberRequirement: string;
}

interface IPersonWithError {
  procesErrorId: string;
  processControlId: string;
  processPersonId: string;
  errorDescription: string;
  errorStatus: string;
}

interface IListOfPeopleToReprocess {
  personPublicCode?: string;
}

interface IReprocessPersonsWithErrorsRequest {
  processControlId: string;
  personPublicCode: string;
}

interface IReprocessPersonsWithErrorsResponse {
  listOfPeopleToProcess: IListOfPeopleToReprocess[];
  processControlId: string;
}



export type {
  IFilterDateForMonthAndYear,
  IpeopleIncludedInTheProcess,
  IProcessPersons,
  IPersonProcessTime,
  IDiscardPersonsWithErrorsResponse,
  IDiscardPersonsWithErrorsRequest,
  IPersonWithError,
  IListOfPeopleToReprocess,
  IReprocessPersonsWithErrorsRequest,
  IReprocessPersonsWithErrorsResponse,
};
