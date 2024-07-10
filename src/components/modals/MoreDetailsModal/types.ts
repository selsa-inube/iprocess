interface ILabel {
  id: string;
  titleName: string;
}

interface IEntries {
  id: string;
  [key: string]: React.ReactNode;
}

export type { ILabel, IEntries };
