import { IPersonProcessTime } from "@pages/validateProgress/types";

const mapEstimatedTimeToProcessApiToEntity = (
  timeProcess: Record<string, string | number | object>
): IPersonProcessTime => {
  const timeCompleteProcess: IPersonProcessTime = {
    totalPersons: Number(timeProcess.totalPersons),
    totalProcessedPersons: Number(timeProcess.totalProcessedPersons),
    duration: String(timeProcess.remainingDuration),
    totalProcessedPersonsWithError: Number(
      timeProcess.totalProcessedPersonsWithError
    ),
    processStartDate: String(timeProcess.processStartDate),
    processEstimatedEndDate: String(timeProcess.processEstimatedEndDate),
  };
  return timeCompleteProcess;
};

export { mapEstimatedTimeToProcessApiToEntity };
