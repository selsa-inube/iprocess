import { MdInfoOutline } from "react-icons/md";
import { SkeletonLine } from "@inubekit/skeleton";
import { Tag } from "@inubekit/tag";
import { Text } from "@inubekit/text";
import { Stack } from "@inubekit/stack";

import { appearances } from "@pages/startProcess/types";
import { RequirementsModal } from "@components/modals/RequirementsModal";
import { Tooltip } from "@src/design/feedback/Tooltip";
import { tokens } from "@src/design/tokens";
import {
  IGeneralStatusRequirementResponse,
  IProcessRequirementResponse,
} from "@src/types/statusRequeriments.types";
import { IData } from "@components/modals/RequirementsModal/types";
import {
  breakPoints,
  dataTablesOnDemandConfig,
} from "./config/tablesRequirements.config";
import { StyledContainer } from "./styles";

interface OnDemandRequirementsUIProps {
  id: string;
  isVisibleStatusReq: boolean;
  isVisibleRequirements: boolean;
  showModal: boolean;
  processRequirementData: IProcessRequirementResponse[];
  handleToggleModal: () => void;
  normalizeStatusRequirement?: {
    status: string;
    name: string;
    appearance: string;
  };
  statusRequirement?: IGeneralStatusRequirementResponse;
}

const OnDemandRequirementsUI = (props: OnDemandRequirementsUIProps) => {
  const {
    id,
    isVisibleStatusReq,
    isVisibleRequirements,
    showModal,
    normalizeStatusRequirement,
    processRequirementData,
    statusRequirement,
    handleToggleModal,
  } = props;

  return (
    <>
      {isVisibleStatusReq ? (
        <SkeletonLine width="80px" animated />
      ) : (
        <StyledContainer onClick={handleToggleModal}>
          {statusRequirement && statusRequirement?.generalStatus?.length > 0 ? (
            <Stack gap={tokens.spacing.s050} direction="row">
              <Stack height="80%">
                <Tag
                  label={normalizeStatusRequirement?.name || ""}
                  appearance={
                    (normalizeStatusRequirement?.appearance as appearances) ||
                    "gray"
                  }
                  weight="strong"
                />
              </Stack>
              {(normalizeStatusRequirement?.name === "Sin Evaluar" ||
                normalizeStatusRequirement?.name === "No Cumple") && (
                <Tooltip
                  description={
                    "Puede hacer clic en el botón para prevalidar los requisitos"
                  }
                  appearanceIcon="dark"
                  icon={<MdInfoOutline />}
                  sizeIcon="16px"
                />
              )}
            </Stack>
          ) : (
            <Text type="body" size="medium">
              No se encontró información
            </Text>
          )}
        </StyledContainer>
      )}

      {(normalizeStatusRequirement?.name === "Sin Evaluar" ||
        normalizeStatusRequirement?.name === "No Cumple") &&
        showModal &&
        id && (
          <RequirementsModal
            breakpoints={breakPoints}
            loading={isVisibleRequirements}
            portalId="portal"
            requirements={dataTablesOnDemandConfig(processRequirementData) as IData[]}
            title="Pre-validar Requisitos"
            onCloseModal={handleToggleModal}
          />
        )}
    </>
  );
};

export { OnDemandRequirementsUI };
