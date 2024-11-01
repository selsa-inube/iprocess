import { IpeopleIncludedInTheProcess } from "@pages/validateProgress/types";

const mapPeopleIncludedInProcessApiToEntity = (
  peopleIncluded: Record<string, string | number | object>
): IpeopleIncludedInTheProcess => {
  const peopleIncludedProcess: IpeopleIncludedInTheProcess = {
    processCatalogId: String(peopleIncluded.processCatalogId),
    processControlId: String(peopleIncluded.processControlId),
    timeUsedToInsertPeople: Number(peopleIncluded.timeUsedToInsertPeople),
    plannedExecution: String(peopleIncluded.plannedExecution),
    uniqueReferenceNumberRequirement: String(peopleIncluded.uniqueReferenceNumberRequirement),
    confirmationForExecutionOfTheProcess: String(peopleIncluded.confirmationForExecutionOfTheProcess),
    processPersons: Object(peopleIncluded.processPersons),
  };
  
  return peopleIncludedProcess;
};

export { mapPeopleIncludedInProcessApiToEntity };
