interface IProcessErrors {
  errorDescription: string;
  errorStatus: string;
  procesErrorId: string;
  processControlId: string;
  processPersonId: string;
}

interface IPersonProcess {
  processPersonId: string;
  personPublicCode: string;
  personName: string;
  startDate: string;
  finishDate: string;
  actions?: IActions[];
  executionStatusByPerson?: string;
  processErrors?: IProcessErrors[];
  errorsDescription?: string;
}

interface IActions {
  id: string;
  content: (entries: IPersonProcess) => React.ReactNode;
}

interface IEntries {
  id: string;
  [key: string]: string | object |React.ReactNode;
}

export type { IPersonProcess, IActions, IEntries };
