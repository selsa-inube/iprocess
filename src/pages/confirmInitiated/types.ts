interface IConfirmInitiated {
  id: string;
  processName: string;
  executionDate: Date;
  totalPeople: number;
  executionDateAndHour?: Date;
  requeriments?: string;
}

export type { IConfirmInitiated };
