interface ILabel {
  id: string;
  titleName: string;
}

interface IEntries {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export type { ILabel, IEntries };
