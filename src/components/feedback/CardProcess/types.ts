interface IProcess {
  id: string;
  description: string;
  date?: string | Date | undefined;
  actions?: IActions[];
  duration?: number;
  periodicity?: string;
  status?: React.ReactNode;
  statusText?: string;
  totalPersons?: number;
  totalPersonsCoversProcess?: number;
  totalPersonsProsecuted?: number;
}

interface IActions {
  id: string;
  content: (entry: IProcess) => React.ReactNode;
}

export type { IProcess, IActions };
