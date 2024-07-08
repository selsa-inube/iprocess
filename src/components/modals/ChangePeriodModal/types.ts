interface ILabel {
  id: string;
  titleName: string;
}

interface IEntries {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

interface IChangePeriodEntry {
  month: string;
  year: string;
  change?: boolean
}

export type { ILabel, IEntries, IChangePeriodEntry };
