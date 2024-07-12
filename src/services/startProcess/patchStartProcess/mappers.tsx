import { IStartProcessesRequest } from "@pages/startProcess/types";

const mapStartProcessEntityToApi = (
  startProcess: IStartProcessesRequest
): Record<string, string | number | object> => {
  return {
    processCatalogId: String(startProcess.processCatalogId),
    month: Number(startProcess.month),
    suggestedDescription: String(startProcess.year),
    year: Number(startProcess.year),
    cutOffDate: String(startProcess.cutOffDate),
    complementaryDescription: String(startProcess.complementaryDescription),
  };
};

export { mapStartProcessEntityToApi };
