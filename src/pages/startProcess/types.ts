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
  aplication?: string;
  periodicity?: string;
}

interface StartProcessesFilter {
  onDemand: StartProcesses[];
  scheduled: StartProcesses[];
}

export type { FilterProcessesForDate, StartProcesses, StartProcessesFilter };
