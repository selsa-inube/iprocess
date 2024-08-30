interface ILabel {
  id: string;
  titleName: string;
}

interface IEntries {
  [key: string]: string | Date |React.ReactNode;
}

export type { ILabel, IEntries };
