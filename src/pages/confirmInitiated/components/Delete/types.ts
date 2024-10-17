interface IRemoveProcessRequest {
  processControlId: string;
  processDescription: string;
  removalJustification: string;
}

interface IProcessErrors {
  procesErrorId: string;
}

interface IProcessPersons {
  processErrors: IProcessErrors[];
  processPersonId: string;
}

interface IRemoveProcessResponse {
  processControlId: string;
  removalJustification: string;
  processPersons: IProcessPersons[];
}

export type { IRemoveProcessRequest, IRemoveProcessResponse };
