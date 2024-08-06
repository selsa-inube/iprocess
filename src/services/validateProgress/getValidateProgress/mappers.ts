import {
    ValidateProgresses,
  } from "@pages/validateProgress/types";
  import { periodicityValuesMock } from "@mocks/startProcess/utils.mocks";
  
  const mapValidateProgressesApiToEntity = (
    progress: Record<string, string | number | object >
  ): ValidateProgresses => {
    const progresses: ValidateProgresses = {
      id: String(progress.processControlId),
      processDescription: String(progress.processDescription),
      executionDate: new Date(String(progress.executionDate)),
      generalError: String(progress.generalError),
      aplication: String(progress.aplication),
      periodicity: periodicityValuesMock[String("Daily")],
    };
    return progresses;
  };
  
  const mapValidateProgressesApiToEntities = (
    progress: Record<string, string | number | object>[]
  ): ValidateProgresses[] => {
    return progress
      .map(mapValidateProgressesApiToEntity)
      .sort((a, b) => b.executionDate.getTime() - a.executionDate.getTime());
  };
  
  export {
    mapValidateProgressesApiToEntities,
    mapValidateProgressesApiToEntity,
  };
  