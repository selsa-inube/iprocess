import { IStartProcessesRequest } from "@pages/startProcess/types";

const mapStartProcessEntityToApi = (
  startProcess: IStartProcessesRequest
): Record<string, string | number | object> => {
  return {
    complementaryDescription: String(startProcess.complementaryDescription),
    cutOffDate: String(startProcess.cutOffDate),
    month: Number(startProcess.month),
    plannedExecution: String(startProcess.plannedExecution),
    plannedExecutionDate: String(startProcess.plannedExecutionDate),
    processCatalogId: String(startProcess.processCatalogId),
    publicCode: String(startProcess.publicCode),
    suggestedDescription: String(startProcess.suggestedDescription),
    year: Number(startProcess.year),
    executionParameters: Object(startProcess.executionParameters),
  };

};

export { mapStartProcessEntityToApi };
