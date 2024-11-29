import { IDiscardPersonsWithErrorsRequest } from "@pages/validateProgress/types";

const mapDiscardPersonsWithErrorEntityToApi = (
  discard: IDiscardPersonsWithErrorsRequest
): Record<string, string | number | object> => {
  return {
    processControlId: discard.processControlId,
    processPersons: [
      {
        processPersonId: discard.processPersonId,
      },
    ],
  };
};

export { mapDiscardPersonsWithErrorEntityToApi };
