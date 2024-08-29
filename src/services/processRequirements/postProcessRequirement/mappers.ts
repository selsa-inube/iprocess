import { IProcessRequirementRequest } from "@ptypes/statusRequeriments.types";

const mapprocessRequirementEntityToApi = (
  process: IProcessRequirementRequest
): Record<string, string | number | object> => {
  return {
    month: Number(process.month),
    executionDate: String(process.executionDate),
    plannedExecution: String(process.plannedExecution),
    publicCode: String(process.publicCode),
    year: Number(process.year),
    executionParameters: {
      typeExecution: String(process.typeExecution),
    },
      cutOffDate: String(process.cutOffDate),
  };
};

export { mapprocessRequirementEntityToApi };
