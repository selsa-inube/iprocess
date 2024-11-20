import { IReprocessPersonsWithErrorsRequest } from "@pages/validateProgress/types";

const mapReprocessPersonsWithErrorEntityToApi = (
  reprocess: IReprocessPersonsWithErrorsRequest
): Record<string, string | number | object> => {
  return {
    processControlId: reprocess.processControlId,
    persons: reprocess.persons.map((person) => ({
      personPublicCode: person.personPublicCode,
    })),
  };

};

export { mapReprocessPersonsWithErrorEntityToApi };
