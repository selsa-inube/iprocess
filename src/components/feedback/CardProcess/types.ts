interface IProcess {
  id: string;
  publicCode: string;
  description: string;
  date?:  Date | string | undefined;
  actions?: IActions[];
  duration?: number;
  periodicity?: string; 
  status?: React.ReactNode;
  statusText?: string;
  totalPerson?: number;
  totalPersonsCoversProcess?: number;
  totalPersonsProsecuted?: number;
}

interface IActions {
  id: string;
  content: (entry: IProcess) => React.ReactNode;
}

interface IEntries {
  id: string;
  [key: string]: string | object |React.ReactNode;
}

export type { IProcess, IActions, IEntries };
