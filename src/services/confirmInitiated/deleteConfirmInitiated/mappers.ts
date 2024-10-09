import { IRemoveProcessRequest } from "@pages/confirmInitiated/components/Delete/types";

const mapDeleteConfirmInitiatedToApi = (
  process: IRemoveProcessRequest
): Record<string, string | number | object> => {
  return {
    removeProcessControlCatalog: [
      {
        processControlId: process.processControlId,
        processDescription: process.processDescription,
        removalJustification: process.removalJustification,
      },
    ],
  };
};

export { mapDeleteConfirmInitiatedToApi };
