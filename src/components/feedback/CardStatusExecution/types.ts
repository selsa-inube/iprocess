interface IPersonProcess {
  id: string;
  code: string;
  namePerson: string;
  dateStart: string;
  dateEnd: string;
  actions?: IActions[];
  status?: string;
}

interface IActions {
  id: string;
  content: (entry: IPersonProcess) => React.ReactNode;
}

interface IEntries {
  id: string;
  [key: string]: string | object |React.ReactNode;
}

export type { IPersonProcess, IActions, IEntries };
