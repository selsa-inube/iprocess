import { IConfirmProcessRequest } from "@pages/confirmInitiated/types";

const mapConfirmProcessEntityToApi = (
  confirmProcess: IConfirmProcessRequest
): Record<string, string | number | object> => {
  return {
    processControlId: String(confirmProcess.processControlId),
  };

};

export { mapConfirmProcessEntityToApi };
