import {
    ValidateProgresses,
  } from "@pages/validateProgress/types";
  
  
  const mapValidateProgressesApiToEntity = (
    progress: Record<string, string | number | object>
  ): ValidateProgresses => {
    const progresses: ValidateProgresses = {
      id: String(progress.processCatalogId),
      businessUnit: String(progress.businessUnit),
      executionDate:new Date(String(progress.executionDate)),
    };
    return progresses;
  };
  
  const mapValidateProgressesApiToEntities = (
    progresses: Record<string, string | number | object>[]
  ): ValidateProgresses[] => {
    return progresses
      .map(mapValidateProgressesApiToEntity)
      .sort((a, b) => b.executionDate.getTime() - a.executionDate.getTime());
  };
  
  export {
    mapValidateProgressesApiToEntity,
    mapValidateProgressesApiToEntities,
  };
  