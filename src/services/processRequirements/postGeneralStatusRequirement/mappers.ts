import { IGeneralStatusRequirementRequest } from "@ptypes/statusRequeriments.types";

const mapGeneralStatusRequirementEntityToApi = (
  process: IGeneralStatusRequirementRequest
): Record<string, string | number | object> => {
  return {
    month: Number(process.month),
    plannedExecution: String(process.plannedExecution),
    publicCode: String(process.publicCode),
    year: Number(process.year),
  };
};

export { mapGeneralStatusRequirementEntityToApi };