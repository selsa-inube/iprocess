import { IEnumeratorsProcessCoverage } from "@forms/types";

const mapEnumProcessCoverageApiToEntity = (
    ProcessCoverage: Record<string, string | number | object>
): IEnumeratorsProcessCoverage => {
  const processes: IEnumeratorsProcessCoverage = {
    id: String(ProcessCoverage.value),
    label: String(ProcessCoverage.description),
    value: String(ProcessCoverage.code),
    
  };
  return processes;
};

const mapEnumProcessCoverageApiToEntities = (
    ProcessCoverage: Record<string, string | number | object>[]
  ): IEnumeratorsProcessCoverage[] => {
    return ProcessCoverage.map(mapEnumProcessCoverageApiToEntity);
  };

export { mapEnumProcessCoverageApiToEntity, mapEnumProcessCoverageApiToEntities };