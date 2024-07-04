interface ILabel {
  id: string;
  titleName: string;
}

interface IEntries {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

interface IChangeDateEntry {
  month: string;
  year: string;
  active?: boolean
}

export type { ILabel, IEntries, IChangeDateEntry };
