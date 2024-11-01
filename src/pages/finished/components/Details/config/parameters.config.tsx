import {
  IData,
  ITitlesRequirements,
} from "@components/modals/requirementsModal/types";
import { IlistOfRequirements } from "@ptypes/packageRequeriment.types";
import { RequirementTypeNormalize } from "@utils/requirements";

const titlesParameters = [
  {
    id: "parameter",
    titleName: "Parámetro",
    priority: 0,
  },
  {
    id: "value",
    titleName: "Valor",
    priority: 0,
  },
];

const breakPointsParameters = [
  { breakpoint: "(min-width: 1091px)", totalColumns: 2 },
];

const requirementsDetailsNormailze = (process: IlistOfRequirements[]) =>
  process.map((entry) => ({
    id: entry.requirementId,
    descriptionUse: entry.descriptionUse,
    requirementType: entry.typeOfRequirementToEvaluated,
  }));

const dataTablesDetailsConfig = (entry: IlistOfRequirements[]) => {
  const dataTables: IData[] = [];

  requirementsDetailsNormailze(entry).forEach((entry, _, requirements) => {
    if (!dataTables.some((e) => e.id === entry.requirementType)) {
      const titleRequirements: ITitlesRequirements[] = [
        {
          id: `descriptionUse`,
          titleName:
            RequirementTypeNormalize[
              entry.requirementType as keyof typeof RequirementTypeNormalize
            ],
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

export {
  titlesParameters,
  breakPointsParameters,
  requirementsDetailsNormailze,
  dataTablesDetailsConfig,
};
