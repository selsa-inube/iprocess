import { MdInfoOutline } from "react-icons/md";
import { useMediaQuery, Stack, Text } from "@inubekit/inubekit";
import { SkeletonLine } from "@inubekit/skeleton";
import { Tag } from "@inubekit/tag";

import { appearances } from "@pages/startProcess/types";
import { RequirementsModal } from "@components/modals/requirementsModal";
import { Tooltip } from "@design/feedback/Tooltip";
import { tokens } from "@design/tokens";
import { IRefNumPackageRequirement } from "@ptypes/packageRequeriment.types";
import { mediaQueryMobile } from "@config/environment";
import {
  actionsResponsiveReq,
  breakPoints,
  dataTablesConfig,
} from "./config/tablesRequirements.config";
import { StyledContainer } from "./styles";

interface RequirementsUIProps {
  isVisibleStatusReq: boolean;
  showModal: boolean;
  handleToggleModal: () => void;
  normalizeStatusRequirement?: {
    status: string;
    name: string;
    appearance: string;
  };
  statusRequirement?: IRefNumPackageRequirement;
  setLoadDataTable: (show: boolean) => void;
  withTooltip: boolean;
}

const RequirementsUI = (props: RequirementsUIProps) => {
  const {
    isVisibleStatusReq,
    showModal,
    normalizeStatusRequirement,
    statusRequirement,
    handleToggleModal,
    setLoadDataTable,
    withTooltip,
  } = props;

  const tabletScreen = useMediaQuery(mediaQueryMobile);

  const validateStatus =
    normalizeStatusRequirement?.name === "Sin Evaluar" ||
    normalizeStatusRequirement?.name === "No Cumple";
    
  return (
    <>
      {isVisibleStatusReq ? (
        <SkeletonLine width="80px" animated />
      ) : (
        <StyledContainer
          onClick={handleToggleModal}
          $withCursor={validateStatus}
        >
          {statusRequirement &&
          statusRequirement?.generalStatusRequirement?.length? (
            <Stack gap={tokens.spacing.s050} direction="row">
              <Stack height="80%">
                <Tag
                  label={normalizeStatusRequirement?.name || ""}
                  appearance={
                    (normalizeStatusRequirement?.appearance as appearances) ||
                    "light"
                  }
                  weight="strong"
                />
              </Stack>
              {withTooltip && validateStatus && (
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
            <Text type="label" size="small" appearance="gray">
              No hay información
            </Text>
          )}
        </StyledContainer>
      )}

      {validateStatus && showModal && (
        <RequirementsModal
          breakpoints={breakPoints}
          isLoading={isVisibleStatusReq}
          portalId="portal"
          requirements={dataTablesConfig(statusRequirement || {} as IRefNumPackageRequirement, setLoadDataTable,  tabletScreen)}
          title="Pre-validar Requisitos"
          onCloseModal={handleToggleModal}
          actionsResponsiveReq={actionsResponsiveReq}
        />
      )}
    </>
  );
};

export { RequirementsUI };
