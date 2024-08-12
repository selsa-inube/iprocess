interface IProcess {
  id: string;
  description: string;
  statusText: string;
  status: React.ReactNode;
  date: string | Date;
  actions: IActions[];
  periodicity?: string;
  totalPersons?: number;
  totalPersonsProsecuted?: number;
  totalPersonsCoversProcess?: number;
  duration?: number;
}

interface IActions {
  id: string;
  content: (entry: IProcess) => React.ReactNode;
}

export type { IProcess, IActions };
