import { StartProcesses } from "@pages/startProcess/types";

const mapValidateProgressApiToEntity = (
  process: Record<string, string | number | object>
): StartProcesses => {
  const processes: StartProcesses = {
    id: String(process.processControlId),
    aplication: Object(process.application),
    description: String(process.processDescription),
    dateAndHour: new Date(String(process.executionDate)),
    date: new Date(String(process.plannedExecutionDate)),
    plannedExecution: String(process.plannedExecution),
    totalPerson: Number(process.totalPeople), 
    totalPersonsProsecuted: Number(process.totalPeopleProcessed),
    referenceNumberRequirement: String(process.uniqueReferenceNumberRequirement),
    timeUsedToInsertPeople: Number(process.timeUsedToInsertPeople),
    detailPeopleProcessed: Object(process.detailPeopleProcessed),
    status: String(process.processStatus),
  };
  return processes;
};

const mapValidateProgressApiToEntities = (
  processes: Record<string, string | number | object>[]
) => {
  return processes
    .map(mapValidateProgressApiToEntity).sort((a, b) => (a.dateAndHour?.getTime() || 0) - (b.dateAndHour?.getTime() || 0));
};

export { mapValidateProgressApiToEntity, mapValidateProgressApiToEntities };
