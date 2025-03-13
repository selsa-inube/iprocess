import { createPortal } from "react-dom";
import { MdOutlineClose } from "react-icons/md";
import {
  useMediaQuery,
  Stack,
  Text,
  Icon,
  Divider,
  Blanket,
  Button,
} from "@inubekit/inubekit";

import { Table } from "@components/data/Table";
import { IAction, IBreakpoint } from "@components/data/Table/props";
import { ComponentAppearance } from "@ptypes/aparences.types";
import { mediaQueryMobile } from "@config/environment";
import { IData } from "./types";
import { StyledContainerTables, StyledModal } from "./styles";

interface RequirementsModalProps {
  breakpoints: IBreakpoint[];
  isLoading: boolean;
  portalId: string;
  requirements: IData[];
  title: string;
  onCloseModal: () => void;
  actionsResponsiveReq?: IAction[];
}

function RequirementsModal(props: RequirementsModalProps) {
  const {
    breakpoints,
    isLoading,
    portalId,
    requirements,
    title,
    actionsResponsiveReq,
    onCloseModal,
  } = props;

  const node = document.getElementById(portalId);

  const isMobile = useMediaQuery(mediaQueryMobile);

  if (!node) {
    throw new Error(
      "The portal node is not defined. This can occur when the specific node used to render the portal has not been defined correctly."
    );
  }

  return createPortal(
    <Blanket>
      <StyledModal $smallScreen={isMobile}>
        <Stack direction="column" width="100%">
          <Stack justifyContent="space-between" alignItems="center">
            <Text type="title" size="medium" appearance="dark">
              {title}
            </Text>
            <Icon
              appearance="dark"
              icon={<MdOutlineClose />}
              onClick={onCloseModal}
              cursorHover={true}
              size="20px"
              spacing="narrow"
            />
          </Stack>
        </Stack>
        <Divider dashed />

        {requirements.length === 0 ? (
          <Stack padding="12px">
            <Text
              type="body"
              size="medium"
              appearance={ComponentAppearance.DARK}
              ellipsis
            >
              No identificado
            </Text>
          </Stack>
        ) : (
          <StyledContainerTables $smallScreen={isMobile}>
            {requirements.map((requirement) => (
              <Stack direction="column" key={requirement.id} width="100%">
                <Table
                  id="portal"
                  titles={requirement.titlesRequirements}
                  actions={requirement.actionsRequirements}
                  actionsResponsive={actionsResponsiveReq || []}
                  entries={requirement.entriesRequirements}
                  isLoading={isLoading}
                  breakpoints={breakpoints}
                  widthFirstColumn="55%"
                  multipleTables={true}
                  typeTitle={"label"}
                />
              </Stack>
            ))}
          </StyledContainerTables>
        )}

        <Stack gap="8px" justifyContent="flex-end">
          <Button
            spacing="wide"
            appearance="primary"
            variant="filled"
            onClick={onCloseModal}
          >
            Cerrar
          </Button>
        </Stack>
      </StyledModal>
    </Blanket>,
    node
  );
}

export type { RequirementsModalProps };

export { RequirementsModal };
