import { StartProcesses } from "@pages/startProcess/types";

const mapFinishedApiToEntity = (
  process: Record<string, string | number | object>
): StartProcesses => {
  const processes: StartProcesses = {
    id: String(process.processControlId),
    description: String(process.processDescription),
    date:new Date(String(process.executionDate)),
    dateAndHour: new Date(String(process.executionDate)),
    totalPerson: Number(process.totalPeople),
    totalPersonsProsecuted: Number(process.totalPeopleProcessed),
    timeUsedToInsertPeople: Number(process.timeUsedToInsertPeople),
    executionParameters: Object(process.executionParameters),
    referenceNumberRequirement: String(process.uniqueReferenceNumberRequirement),
    plannedExecutionDate: String(process.plannedExecutionDate),
    executionOfTheProcess: String(process.confirmationForExecutionOfTheProcess),
    processControlId: String(process.processControlId),
    aplication: Object(process.application),
  };
  return processes;
};

const mapFinishedApiToEntities = (
  processes: Record<string, string | number | object>[]
) => {
  return processes
    .map(mapFinishedApiToEntity).sort((a, b) => (a.dateAndHour?.getTime() || 0) - (b.dateAndHour?.getTime() || 0));
};

export { mapFinishedApiToEntity, mapFinishedApiToEntities };
