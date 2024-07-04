import {
  StartProcesses,
} from "@pages/startProcess/types";


const mapStartProcessApiToEntity = (
  process: Record<string, string | number | object>
): StartProcesses => {
  const processes: StartProcesses = {
    id: String(process.processCatalogId),
    abbreviatedName: String(process.abbreviatedName),
    executionDate:new Date(String(process.estimatedExecutionDate)),
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
