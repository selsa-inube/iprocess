interface FilterProcessesForDate {
  executionDate: string;
  month: string;
  year: string;
}

interface StartProcesses {
  id: string;
  abbreviatedName: string;
  executionDate: Date;
  requeriments?: string;
}

export type { FilterProcessesForDate, StartProcesses };