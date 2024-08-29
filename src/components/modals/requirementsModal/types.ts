import { IAction } from "@components/data/Table/props";

interface ITitlesRequirements {
    id: string;
    titleName: string;
    priority: number;
}

interface IEntries {
    id: string;
    [key: string]: React.ReactNode;
  }

  interface IData {
    id: string;
    titlesRequirements: ITitlesRequirements[];
    entriesRequirements: IEntries[];
    actionsRequirements?: IAction[];
  }
  


export type {ITitlesRequirements, IEntries, IData}