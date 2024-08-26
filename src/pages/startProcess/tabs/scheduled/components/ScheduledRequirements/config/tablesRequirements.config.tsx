import { Tag } from "@inubekit/tag";

import { MoreDetails } from "@pages/startProcess/tabs/scheduled/components/ScheduledRequirements/MoreDetails";
import {
  appearances,
  IAction,
  IData,
  ITitlesRequirements,
} from "@pages/startProcess/types";
import { IProcessRequirementResponse } from "@src/types/statusRequeriments.types";
import {
  normalizeEvalStatusRequirementByStatus,
  RequirementTypeNormalize,
} from "@utils/requirements";

const requirementsNormailzeEntries = (process: IProcessRequirementResponse[]) =>
  process.map((entry) => ({
    ...entry,
    id: entry.requirementId,
    publicCode: entry.publicCode,
    descriptionUse: entry.descriptionUse,
    descriptionUseForCustomers: entry.descriptionUseForCustomers,
    requirementType: entry.requirementType,
    evaluationStatus: entry.evaluationStatus && (
      <Tag
        label={
          normalizeEvalStatusRequirementByStatus(String(entry.evaluationStatus))
            ?.name || ""
        }
        appearance={
          normalizeEvalStatusRequirementByStatus(String(entry.evaluationStatus))
            ?.appearance as appearances
        }
        weight="strong"
      />
    ),
    evaluationStatusText: entry.evaluationStatus,
    evaluationDescription: entry.evaluationDescription,
  }));


const moreDetailsNormailzeEntries = (
  requiriment: IProcessRequirementResponse
) => {
  return {
    id: requiriment.requirementId,
    publicCode: requiriment.publicCode,
    evaluationStatus: normalizeEvalStatusRequirementByStatus(requiriment.evaluationStatusText || "")?.name,
    evaluationDescription: requiriment.evaluationDescription,
  };
};


const dataTablesConfig = (entry: IProcessRequirementResponse[]) => {
  const dataTables: IData[] = [];

  requirementsNormailzeEntries(entry).forEach((entry, _, requirements) => {
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

      const actions: IAction[][] = [
        [
          {
            id: "details",
            actionName: "Más Detalles",
            content: (process: IProcessRequirementResponse) => (
              <MoreDetails data={moreDetailsNormailzeEntries(process)} />
            ),
          },
        ],
        [
          {
            id: "details",
            actionName: "",
            content: (process: IProcessRequirementResponse) => (
              <MoreDetails data={moreDetailsNormailzeEntries(process)} />
            ),
          },
        ],
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
        actionsRequirements: dataTables.length > 0 ? actions[1] : actions[0],
      });
    }
  });
  return dataTables;
};

const breakPoints = [{ breakpoint: "(min-width: 1091px)", totalColumns: 3 }];

const labelsMoreDetails = [
  {
    id: "evaluationStatus",
    titleName: "Evaluación",
  },
  {
    id: "evaluationDescription",
    titleName: "Descripción de la evaluación",
    priority: 1,
  },
];

export {
  dataTablesConfig,
  breakPoints,
  labelsMoreDetails,
  requirementsNormailzeEntries,
  moreDetailsNormailzeEntries,
};
