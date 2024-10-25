import { IEstimatedTimeToCompleteProcess } from "@pages/validateProgress/types";

const mapEstimatedTimeToProcessApiToEntity = (
  timeProcess: Record<string, string | number | object>
): IEstimatedTimeToCompleteProcess => {
  const timeCompleteProcess: IEstimatedTimeToCompleteProcess = {
    totalPersons: Number(timeProcess.timeUsedToInsertPeople),
    totalProcessedPersons: Number(timeProcess.totalProcessedPersons),
    duration: String(timeProcess.remainingDuration),
  };
  return timeCompleteProcess;
};

export { mapEstimatedTimeToProcessApiToEntity };
