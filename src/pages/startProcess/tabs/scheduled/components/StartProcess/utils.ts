import { IStartProcessesRequest } from "@pages/startProcess/types";
import { startProcess } from "@services/startProcess/patchStartProcess";

const startProcessAction = async (
  startProcessData: IStartProcessesRequest
): Promise<boolean> => {
  let confirmationDiscard;
  const newStartProcess = {
    processCatalogId: startProcessData.processCatalogId,
    month: startProcessData.month,
    suggestedDescription: startProcessData.suggestedDescription,
    year: startProcessData.year,
    cutOffDate: startProcessData.cutOffDate,
    typeRefresh: startProcessData.typeRefresh,
    complementaryDescription: startProcessData.complementaryDescription,
    plannedExecutionDate: startProcessData.plannedExecutionDate,
  
  };
  try {
    await startProcess(newStartProcess);
    confirmationDiscard = true;
  } catch (error) {
    confirmationDiscard = false;
    throw error;
  }

  return confirmationDiscard;
};

export { startProcessAction };
