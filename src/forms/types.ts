interface IStartProcessEntry{
    descriptionComplementary: string;
    typeRefresh?: string;
    plannedExecutionDate: string;
}

interface IEntries {
    id: string;
    [key: string]: string | object |React.ReactNode;
  }

  interface IFieldsEntered {
    typeRefresh?: string;
    descriptionComplementary?: string;
    plannedExecutionDate?: string;
  }

export type { IStartProcessEntry, IEntries, IFieldsEntered }