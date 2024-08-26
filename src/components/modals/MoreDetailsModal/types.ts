interface ILabel {
  id: string;
  titleName: string;
}

interface IEntries {
  [key: string]: React.ReactNode;
}

export type { ILabel, IEntries };
