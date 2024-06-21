interface IOperator {
  name: string;
  logo: string;
}
interface IUser {
  username: string;
  id: string;
  company: string;
  operator: IOperator;
}

export interface IClient {
  id: string;
  name: string;
  sigla: string;
  logo: string;
}

export interface IAppContext {
  user: IUser;
  handleClientChange: (client: IClient) => void;
}

export interface AppContextProviderProps {
  children: React.ReactNode;
}
