import {
  StartProcesses,
} from "@pages/startProcess/types";
import { periodicityValuesMock } from "@mocks/domains/startProcess/utils.mocks";


const mapStartProcessApiToEntity = (
  process: Record<string, string | number | object>
): StartProcesses => {
  const processes: StartProcesses = {
    id: String(process.processCatalogId),
    abbreviatedName: String(process.abbreviatedName),
    executionDate:new Date(String(process.estimatedExecutionDate)),
    aplication:String(process.aplication),
    periodicity: periodicityValuesMock[String(process.periodicity)],
  };
  return processes;
};

const mapStartProcessApiToEntities = (
  processes: Record<string, string | number | object>[]
): StartProcesses[] => {
  return processes
    .map(mapStartProcessApiToEntity)
    .sort((a, b) => b.executionDate.getTime() - a.executionDate.getTime());
};

export {
  mapStartProcessApiToEntity,
  mapStartProcessApiToEntities,
};
