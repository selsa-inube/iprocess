import { IData, ITitlesRequirements } from "@pages/startProcess/types";
import { IProcessRequirementResponse } from "@src/types/statusRequeriments.types";
import { RequirementTypeNormalize } from "@utils/requirements";

const requirementsDetailsNormailze = (process: IProcessRequirementResponse[]) =>
  process.map((entry) => ({
    id: entry.requirementId,
    descriptionUse: entry.descriptionUse,
    requirementType: entry.requirementType,
  }));

const dataTablesDetailsConfig = (entry: IProcessRequirementResponse[]) => {
  const dataTables: IData[] = [];
  requirementsDetailsNormailze(entry).forEach((entry, _, requirements) => {
    if (!dataTables.some((e) => e.id === entry.requirementType)) {
      const titleRequirements: ITitlesRequirements[] = [
        {
          id: `descriptionUse`,
          titleName: RequirementTypeNormalize[entry.requirementType],
          priority: 0,
        },
        {
          id: `evaluationStatus`,
          titleName: "",
          priority: 1,
        },
      ];

      dataTables.push({
        id: entry.requirementType,
        titlesRequirements: titleRequirements,
        entriesRequirements: requirements
          .filter(
            (requirement) =>
              requirement.requirementType === entry.requirementType
          )
          .map((requirement, index) => ({ ...requirement, id: String(index) })),
      });
    }
  });
  return dataTables;
};

const breakPoints = [{ breakpoint: "(min-width: 1091px)", totalColumns: 3 }];

export { breakPoints, dataTablesDetailsConfig, requirementsDetailsNormailze };
