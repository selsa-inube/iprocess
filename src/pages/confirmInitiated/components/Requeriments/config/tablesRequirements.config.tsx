import { Tag } from "@inubekit/tag";

import { IAction, IActions } from "@components/data/Table/props";
import { 
  IData,
  ITitlesRequirements,
} from "@components/modals/requirementsModal/types";
import {
  normalizeEvalStatusRequirementByStatus,
  RequirementTypeNormalize,
} from "@utils/requirements";
import { IlistOfRequirements } from "@ptypes/packageRequeriment.types";
import { appearances } from '@pages/confirmInitiated/types';
import { MoreDetails } from '../MoreDetails';
import { Icon } from "@inubekit/icon";
import { MdOutlineCheckCircle } from 'react-icons/md';

const requirementsNormailzeEntries = (process: IlistOfRequirements[]) =>
  process.map((entry) => ({
    ...entry,
    id: entry.requirementId,
    descriptionUse: entry.descriptionUse,
    requirementType: entry.typeOfRequirementToEvaluated,
    evaluationStatus: entry.requirementStatus && (
      <Tag
        label={
          normalizeEvalStatusRequirementByStatus(String(entry.requirementStatus))
            ?.name || ""
        }
        appearance={
          normalizeEvalStatusRequirementByStatus(String(entry.requirementStatus))
            ?.appearance as appearances
        }
        weight="strong"
      />
    ),
    evaluationStatusText: entry.requirementStatus,
    evaluationDescription: entry.descriptionEvaluationRequirement,
  }));


const moreDetailsNormailzeEntries = (
  requiriment: IlistOfRequirements
) => {
  return {
    id: requiriment.requirementId,
    evaluationStatus: normalizeEvalStatusRequirementByStatus(requiriment.requirementStatus || "")?.name,
    evaluationDescription: requiriment.descriptionEvaluationRequirement,
    
  };
   
};


const dataTablesConfig = (entry: IlistOfRequirements[]) => {
  const dataTables: IData[] = [];

  requirementsNormailzeEntries(entry).forEach((entry, _, requirements) => {
    if (!dataTables.some((e) => e.id === entry.requirementType)) {
      const titleRequirements: ITitlesRequirements[] = [
        {
          id: `descriptionUse`,
          titleName: RequirementTypeNormalize[entry.typeOfRequirementToEvaluated as keyof typeof RequirementTypeNormalize],
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
            content: (entry: IActions) => (
              <MoreDetails data={moreDetailsNormailzeEntries(entry as IlistOfRequirements)} />
            ),
          },
          {
            id: "approvals",
            actionName: "Aprobaciones",
            content: () => (
              <Icon  icon={<MdOutlineCheckCircle />} appearance="dark" size="16px"/>
            ),
          },
        ],
        [
          {
            id: "details",
            actionName: "",
            content: (entry: IActions) => (
              <MoreDetails data={moreDetailsNormailzeEntries(entry as IlistOfRequirements)} />
            ),
          },
         {
            id: "approvals",
            actionName: "",
            content: () => (
              <Icon  icon={<MdOutlineCheckCircle />} appearance="dark" size="16px"/>
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

const breakPoints = [{ breakpoint: "(min-width: 1091px)", totalColumns: 3 }];

export {
  dataTablesConfig,
  breakPoints,
  labelsMoreDetails,
  requirementsNormailzeEntries,
  moreDetailsNormailzeEntries,
};
