import { IReprocessPersonsWithErrorsRequest } from "@pages/validateProgress/types";

const mapReprocessPersonsWithErrorEntityToApi = (
  reprocess: IReprocessPersonsWithErrorsRequest
): Record<string, string | number | object> => {
  return {
    processControlId: reprocess.processControlId,
    processPersons: [
      {
        personPublicCode: reprocess.personPublicCode,
      },
    ],
  };

};

export { mapReprocessPersonsWithErrorEntityToApi };
