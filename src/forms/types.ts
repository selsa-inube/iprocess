interface IStartProcessEntry{
  descriptionComplementary: string;
  plannedExecutionDate: string;
  cutOffDate?: string;
  typeRefresh?: string;
}

interface IEntries {
  id: string;
  [key: string]: string | Date |object |React.ReactNode;
}

interface IParameters {
  [parameter: string]: string;
  }

interface IFieldsEntered {
  typeRefresh?: string;
  descriptionComplementary?: string;
  plannedExecutionDate?: string;
  parameters?: IParameters
}

interface IEnumeratorsProcessCoverage{
  id: string;
  label: string;
  value: string;
}

export type { IStartProcessEntry, IEntries, IFieldsEntered, IEnumeratorsProcessCoverage }