import { MdCancel, MdCheckCircle, MdDoDisturbOn, MdReportProblem } from "react-icons/md";
import { ITagAppearance, Tag } from "@inubekit/tag";
import { Icon, IIconAppearance } from "@inubekit/icon";

import { MoreDetails } from "@pages/startProcess/tabs/scheduled/components/ScheduledRequirements/MoreDetails";
import {
  IAction,
  IData,
  ITitlesRequirements,
} from "@pages/startProcess/types";
import { IProcessRequirementResponse } from "@ptypes/statusRequeriments.types";
import { IInfoModal } from "@components/modals/InfoModal/types";
import {
  normalizeEvalStatusRequirementByStatus,
  RequirementTypeNormalize,
} from "@utils/requirements";
import { ComponentAppearance } from "@ptypes/aparences.types";

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
          (normalizeEvalStatusRequirementByStatus(
            String(entry.evaluationStatus)
          )?.appearance as ITagAppearance) || "light"
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
    evaluationStatus: normalizeEvalStatusRequirementByStatus(
      requiriment.evaluationStatusText || ""
    )?.name,
    evaluationDescription: requiriment.evaluationDescription,
  };
};

const actionsResponsiveReq = [
  {
    id: "evaluationStatus",
    actionName: "",
    content: () => (
      <></>
    ),
  },
  {
    id: "details",
    actionName: "",
    content: () => (
      <></>
    ),
  },
];

const infoDataTable: IInfoModal[] = [
  {
    infoName: "Cumple",
    infoIcon: <MdCheckCircle />,
    appearanceIcon: ComponentAppearance.SUCCESS,
  },
  {
    infoName: "No Cumple",
    infoIcon: <MdCancel />,
    appearanceIcon: ComponentAppearance.DANGER,
  },
  {
    infoName: "Error",
    infoIcon: <MdReportProblem />,
    appearanceIcon: ComponentAppearance.DANGER,
  },
  {
    infoName: "No Definido",
    infoIcon: <MdDoDisturbOn />,
    appearanceIcon: ComponentAppearance.GRAY,
  },
];

const dataTablesConfig = (
  entry: IProcessRequirementResponse[],
  mediaQueryMobile: boolean
) => {
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

      const actionsResponsiveRequirements: IAction[][] = [
        [
          {
            id: "evaluationStatus",
            actionName: "",
            content: (process: IProcessRequirementResponse) => (
              <Icon
                appearance={
                  (normalizeEvalStatusRequirementByStatus(
                    process.evaluationStatusText as string
                  )?.appearance as IIconAppearance) || "gray"
                }
                icon={
                  normalizeEvalStatusRequirementByStatus(
                    process.evaluationStatus as string
                  )?.icon
                }
                size="16px"
              />
            ),
          },
          {
            id: "details",
            actionName: "",
            content: (process: IProcessRequirementResponse) => (
              <MoreDetails data={moreDetailsNormailzeEntries(process)} />
            ),
          },
        ],
        [
          {
            id: "evaluationStatus",
            actionName: "",
            content: (process: IProcessRequirementResponse) => (
              <Icon
                appearance={
                  (normalizeEvalStatusRequirementByStatus(
                    process.evaluationStatus as string
                  )?.appearance as IIconAppearance) || "gray"
                }
                icon={
                  normalizeEvalStatusRequirementByStatus(
                    process.evaluationStatus as string
                  )?.icon
                }
                size="16px"
              />
            ),
          },
          {
            id: "details",
            actionName: "",
            content: (process: IProcessRequirementResponse) => (
              <MoreDetails data={moreDetailsNormailzeEntries(process)} />
            ),
          },
        ],
      ];

      if (mediaQueryMobile) {
        dataTables.push({
          id: entry.requirementType,
          titlesRequirements: titleRequirements,
          entriesRequirements: requirements
            .filter(
              (requirement) =>
                requirement.requirementType === entry.requirementType
            )
            .map((requirement, index) => ({
              ...requirement,
              id: String(index),
            })),
          actionsRequirements:
            dataTables.length > 0
              ? actionsResponsiveRequirements[1]
              : actionsResponsiveRequirements[0],
        });
      } else {
        dataTables.push({
          id: entry.requirementType,
          titlesRequirements: titleRequirements,
          entriesRequirements: requirements
            .filter(
              (requirement) =>
                requirement.requirementType === entry.requirementType
            )
            .map((requirement, index) => ({
              ...requirement,
              id: String(index),
            })),
          actionsRequirements: dataTables.length > 0 ? actions[1] : actions[0],
        });
      }
    }
  });
  return dataTables;
};

const breakPoints = [
  { breakpoint: "(min-width: 771px)", totalColumns: 3 },
  { breakpoint: "(max-width: 770px)", totalColumns: 1 },
];

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
  infoDataTable,
  actionsResponsiveReq,
  requirementsNormailzeEntries,
  moreDetailsNormailzeEntries,
};
