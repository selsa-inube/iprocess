import { MdInfoOutline } from "react-icons/md";
import { useMediaQuery, Stack,Text, SkeletonLine } from "@inubekit/inubekit";
import { Tag } from "@inubekit/tag";

import { appearances } from "@pages/startProcess/types";
import { RequirementsModal } from "@components/modals/requirementsModal";
import { Tooltip } from "@design/feedback/Tooltip";
import { tokens } from "@design/tokens";
import {
  IGeneralStatusRequirementResponse,
  IProcessRequirementResponse,
} from "@ptypes/statusRequeriments.types";
import { IData } from "@components/modals/requirementsModal/types";
import { mediaQueryMobile } from "@config/environment";
import {
  actionsResponsiveReq,
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

  const validateStatus =
    normalizeStatusRequirement?.name === "Sin Evaluar" ||
    normalizeStatusRequirement?.name === "No Cumple";
    
    const tabletScreen = useMediaQuery(mediaQueryMobile);
  return (
    <>
      {isVisibleStatusReq ? (
        <SkeletonLine width="80px" animated />
      ) : (
        <StyledContainer onClick={handleToggleModal} $withCursor={validateStatus}>
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
              {validateStatus && (
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

      {validateStatus &&
        showModal &&
        id && (
          <RequirementsModal
            breakpoints={breakPoints}
            isLoading={isVisibleRequirements}
            portalId="portal"
            requirements={dataTablesOnDemandConfig(processRequirementData, tabletScreen) as IData[]}
            title="Pre-validar Requisitos"
            onCloseModal={handleToggleModal}
          actionsResponsiveReq={actionsResponsiveReq}
          />
        )}
    </>
  );
};

export { OnDemandRequirementsUI };
