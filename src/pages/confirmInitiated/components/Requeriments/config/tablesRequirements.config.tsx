import {
  MdAddCircleOutline,
  MdCancel,
  MdCheckCircle,
  MdDoDisturbOn,
  MdOutlineCheckCircle,
  MdReportProblem,
} from "react-icons/md";
import { Icon, IIconAppearance, Tag } from "@inubekit/inubekit";

import { IAction, IActions } from "@components/data/Table/props";
import {
  IData,
  ITitlesRequirements,
} from "@components/modals/requirementsModal/types";
import {
  normalizeEvalStatusRequirementByStatus,
  RequirementTypeNormalize,
} from "@utils/requirements";
import { IInfoModal } from "@components/modals/InfoModal/types";
import { ComponentAppearance } from "@ptypes/aparences.types";
import {
  IlistOfRequirements,
  IRefNumPackageRequirement,
} from "@ptypes/packageRequeriment.types";
import { appearances } from "@pages/confirmInitiated/types";
import { InfoActions } from "@components/data/Table/InfoActions";
import { MoreDetails } from "../MoreDetails";
import { Approval } from "../Approval";

const requirementsNotMet = [
  "ERROR_IN_EVALUATION",
  "UNVALIDATED",
  "FAILED_SYSTEM_VALIDATION",
  "DOCUMENT_NOT_LOADED",
  "DOCUMENT_STORED_WITHOUT_VALIDATION",
];

const requirementsNormailzeEntries = (entry: IlistOfRequirements[]) =>
  entry.map((entry) => ({
    ...entry,
    id: entry.requirementId,
    descriptionUse: entry.descriptionUse,
    requirementType: entry.typeOfRequirementToEvaluated,
    evaluationStatus: entry.requirementStatus && (
      <Tag
        label={
          normalizeEvalStatusRequirementByStatus(
            String(entry.requirementStatus)
          )?.name || "Estado no definido"
        }
        appearance={
          (normalizeEvalStatusRequirementByStatus(
            String(entry.requirementStatus)
          )?.appearance as appearances) || "gray"
        }
        weight="strong"
      />
    ),
    evaluationStatusText: entry.requirementStatus,
    evaluationDescription: entry.descriptionEvaluationRequirement,
  }));

const moreDetailsNormailzeEntries = (requiriment: IlistOfRequirements) => {
  return {
    id: requiriment.requirementId,
    evaluationStatus: normalizeEvalStatusRequirementByStatus(
      requiriment.requirementStatus || ""
    )?.name,
    evaluationDescription: requiriment.descriptionEvaluationRequirement,
  };
};

const approvalsListOfReqNormailzeEntries = (
  requirement: IlistOfRequirements
) => {
  return {
    packageId: requirement.id,
    requirementId: requirement.requirementId,
    requirementPackageId: requirement.requirementPackageId,
    requirementDate: requirement.requirementDate,
    descriptionUse: requirement.descriptionUse,
    descriptionUseForCustomer: requirement.descriptionUseForCustomer,
    requirementType: requirement.typeOfRequirementToEvaluated,
    requirementStatus: requirement.requirementStatus,
    descriptionEvaluationRequirement:
      requirement.descriptionEvaluationRequirement,
    typeOfRequirementToEvaluated: requirement.typeOfRequirementToEvaluated,
  };
};

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
  {
    infoName: "Más Detalles",
    infoIcon: <MdAddCircleOutline />,
    appearanceIcon: ComponentAppearance.DARK,
  },
  {
    infoName: "Aprobaciones",
    infoIcon: <MdOutlineCheckCircle />,
    appearanceIcon: ComponentAppearance.DARK,
  },
];

const actionsResponsiveReq = [
  {
    id: "evaluationStatus",
    actionName: "",
    content: () => <></>,
  },
  {
    id: "details",
    actionName: "",
    content: () => <></>,
  },
  {
    id: "approvals",
    actionName: "",
    content: () => <></>,
  },
];

const dataTablesConfig = (
  data: IRefNumPackageRequirement,
  setLoadDataTable: (show: boolean) => void,
  mediaQueryMobile: boolean
) => {
  const dataTables: IData[] = [];
  const requirements = data?.listOfRequirements ?? [];

  requirementsNormailzeEntries(requirements).forEach(
    (entry, _, requirements) => {
      if (!dataTables.some((e) => e.id === entry.requirementType)) {
        const titleRequirements: ITitlesRequirements[] = [
          {
            id: `descriptionUse`,
            titleName:
              RequirementTypeNormalize[
                entry.typeOfRequirementToEvaluated as keyof typeof RequirementTypeNormalize
              ],
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
                <MoreDetails
                  data={moreDetailsNormailzeEntries(
                    entry as IlistOfRequirements
                  )}
                />
              ),
            },
            {
              id: "approvals",
              actionName: "Aprobaciones",
              content: (entry: IActions) => (
                <Approval
                  dataListOfRequirements={approvalsListOfReqNormailzeEntries(
                    entry as IlistOfRequirements
                  )}
                  packageId={data.id}
                  setLoadDataTable={setLoadDataTable}
                />
              ),
            },
          ],
          [
            {
              id: "details",
              actionName: "",
              content: (entry: IActions) => (
                <MoreDetails
                  data={moreDetailsNormailzeEntries(
                    entry as IlistOfRequirements
                  )}
                />
              ),
            },
            {
              id: "approvals",
              actionName: "",
              content: (entry: IActions) => (
                <Approval
                  dataListOfRequirements={approvalsListOfReqNormailzeEntries(
                    entry as IlistOfRequirements
                  )}
                  packageId={data.id}
                  setLoadDataTable={setLoadDataTable}
                />
              ),
            },
          ],
        ];

        const actionsResponsiveRequirements: IAction[][] = [
          [
            {
              id: "evaluationStatus",
              actionName: "",
              content: (entry: IActions) => (
                <Icon
                  appearance={
                    (normalizeEvalStatusRequirementByStatus(
                      entry.requirementStatus as string
                    )?.appearance as IIconAppearance) || "gray"
                  }
                  icon={
                    normalizeEvalStatusRequirementByStatus(
                      entry.requirementStatus as string
                    )?.icon
                  }
                  size="16px"
                />
              ),
            },
            {
              id: "details",
              actionName: "",
              content: (entry: IActions) => (
                <MoreDetails
                  data={moreDetailsNormailzeEntries(
                    entry as IlistOfRequirements
                  )}
                />
              ),
            },
            {
              id: "approvals",
              actionName: <InfoActions data={infoDataTable} />,
              content: (entry: IActions) => (
                <Approval
                  dataListOfRequirements={approvalsListOfReqNormailzeEntries(
                    entry as IlistOfRequirements
                  )}
                  packageId={data.id}
                  setLoadDataTable={setLoadDataTable}
                />
              ),
            },
          ],
          [
            {
              id: "evaluationStatus",
              actionName: "",
              content: (entry: IActions) => (
                <Icon
                  appearance={
                    (normalizeEvalStatusRequirementByStatus(
                      entry.requirementStatus as string
                    )?.appearance as IIconAppearance) || "gray"
                  }
                  icon={
                    normalizeEvalStatusRequirementByStatus(
                      entry.requirementStatus as string
                    )?.icon
                  }
                  size="16px"
                />
              ),
            },
            {
              id: "details",
              actionName: "",
              content: (entry: IActions) => (
                <MoreDetails
                  data={moreDetailsNormailzeEntries(
                    entry as IlistOfRequirements
                  )}
                />
              ),
            },
            {
              id: "approvals",
              actionName: "",
              content: (entry: IActions) => (
                <Approval
                  dataListOfRequirements={approvalsListOfReqNormailzeEntries(
                    entry as IlistOfRequirements
                  )}
                  packageId={data.id}
                  setLoadDataTable={setLoadDataTable}
                />
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
            actionsRequirements:
              dataTables.length > 0 ? actions[1] : actions[0],
          });
        }
      }
    }
  );
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

const breakPoints = [
  { breakpoint: "(min-width: 771px)", totalColumns: 3 },
  { breakpoint: "(max-width: 770px)", totalColumns: 1 },
];

export {
  dataTablesConfig,
  breakPoints,
  labelsMoreDetails,
  requirementsNotMet,
  infoDataTable,
  actionsResponsiveReq,
  requirementsNormailzeEntries,
  moreDetailsNormailzeEntries,
};
