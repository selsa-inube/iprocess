import {} from "@pages/startProcess/types";
import { IConfirmInitiated } from "@pages/confirmInitiated/types";

const mapConfirmInitiatedApiToEntity = (
  process: Record<string, string | number | object>
): IConfirmInitiated => {
  const processes: IConfirmInitiated = {
    id: String(process.processControlId),
    processName: String(process.processDescription),
    executionDate: new Date(String(process.executionDate)),
    totalPeople: Number(process.totalPeople),
    requeriments: String(process.uniqueReferenceNumberRequirement),
  };
  return processes;
};

const mapConfirmInitiatedApiToEntities = (
  processes: Record<string, string | number | object>[]
) => {
  return processes
    .map(mapConfirmInitiatedApiToEntity)
    .sort((a, b) => b.executionDate.getTime() - a.executionDate.getTime());
};

export { mapConfirmInitiatedApiToEntity, mapConfirmInitiatedApiToEntities };
