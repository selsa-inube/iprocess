import { IPersonWithError } from "@pages/validateProgress/types";

const mapPersonWithErrorApiToEntity = (
  error: Record<string, string | number | object>
): IPersonWithError => {
  const packageRequirement: IPersonWithError = {
    procesErrorId: String(error.procesErrorId),
    processControlId: String(error.processControlId),
    processPersonId: String(error.processPersonId),
    errorDescription: String(error.errorDescription),
    errorStatus: String(error.errorStatus),
  };
  return packageRequirement;
};

const mapPersonWithErrorToEntities = (
  resend: Record<string, string | number | object>[]
): IPersonWithError[] => {
  return resend.map(mapPersonWithErrorApiToEntity);
};


export {
    mapPersonWithErrorApiToEntity,
    mapPersonWithErrorToEntities,
};
