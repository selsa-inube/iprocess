interface IBusinessUnitstate {
  ref: (EventTarget & HTMLInputElement) | null;
  value: boolean;
}

interface IBusinessUnits {
  businessUnits: IBusinessUnit[];
}

interface IBusinessUnit {
  id: string;
  name: string;
  sigla: string;
  logo: string;
}

export type { IBusinessUnitstate, IBusinessUnits, IBusinessUnit };
