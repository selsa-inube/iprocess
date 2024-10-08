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

  export type appearances = (typeof appearance)[number];
  
  export type { IConfirmInitiated };
  