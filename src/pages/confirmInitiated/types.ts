interface IConfirmInitiated {
  id: string;
  processName: string;
  executionDate: Date;
  totalPeople: number;
  executionDateAndHour?: Date;
  requeriments?: string;
}

export const appearance = [
  "primary",
  "success",
  "warning",
  "danger",
  "help",
  "dark",
  "gray",
  "light",
] as const;

interface IConfirmProcessRequest {
  processControlId: string;
}

interface IConfirmProcessResponse {
  date: string;
  executionUser: string;
  processControlId: string;
  processStatus: string;
  processType: string;
}

export type appearances = (typeof appearance)[number];

export type {
  IConfirmInitiated,
  IConfirmProcessRequest,
  IConfirmProcessResponse,
};
