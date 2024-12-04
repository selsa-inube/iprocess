import { IReprocessPersonsWithErrorsRequest } from "@pages/validateProgress/types";

const mapReprocessPersonsWithErrorEntityToApi = (
  reprocess: IReprocessPersonsWithErrorsRequest
): Record<string, string | number | object> => {
  return {
    processControlId: reprocess.processControlId,
    persons: [
      {
        personPublicCode: reprocess.personPublicCode,
      },
    ],
  };

};

export { mapReprocessPersonsWithErrorEntityToApi };
