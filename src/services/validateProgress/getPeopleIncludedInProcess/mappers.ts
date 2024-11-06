import { IProcessPersons } from "@pages/validateProgress/types";

const mapPeopleIncludedInProcessApiToEntity = (
  peopleIncluded: Record<string, string | number | object>
): IProcessPersons => {
  const peopleIncludedProcess: IProcessPersons = {
  executionStatusByPerson: String(peopleIncluded.executionStatusByPerson),
  finishDate: String(peopleIncluded.finishDate),
  personName: String(peopleIncluded.personName),
  personPublicCode: String(peopleIncluded.personPublicCode),
  processControlId: String(peopleIncluded.processControlId),
  processErrors: Object(peopleIncluded.processErrors),
  processPersonId: String(peopleIncluded.processPersonId),
  startDate:  String(peopleIncluded.startDate),
  };
  return peopleIncludedProcess;
};

const mapPeopleIncludedInProcessToEntities = (
  resend: Record<string, string | number | object>[]
): IProcessPersons[] => {
  return resend.map(mapPeopleIncludedInProcessApiToEntity);
};

export { mapPeopleIncludedInProcessApiToEntity, mapPeopleIncludedInProcessToEntities };
