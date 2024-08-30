import { IEnumeratorsProcessCoverage } from "@src/forms/types";

const mapEnumProcessCoverageApiToEntity = (
    ProcessCoverage: Record<string, string | number | object>
): IEnumeratorsProcessCoverage => {
  const processes: IEnumeratorsProcessCoverage = {
    id: String(ProcessCoverage.code),
    label: String(ProcessCoverage.code),
    value: String(ProcessCoverage.value),
    
  };
  return processes;
};

const mapEnumProcessCoverageApiToEntities = (
    ProcessCoverage: Record<string, string | number | object>[]
  ): IEnumeratorsProcessCoverage[] => {
    return ProcessCoverage.map(mapEnumProcessCoverageApiToEntity);
  };

export { mapEnumProcessCoverageApiToEntity, mapEnumProcessCoverageApiToEntities };