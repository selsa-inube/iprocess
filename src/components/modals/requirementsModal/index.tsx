import { createPortal } from "react-dom";
import { MdOutlineClose } from "react-icons/md";
import { Blanket } from "@inubekit/blanket";
import { Divider } from "@inubekit/divider";
import { Icon } from "@inubekit/icon";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { Button } from "@inubekit/button";

import { Table } from "@components/data/Table";
import { IBreakpoint } from "@components/data/Table/props";

import { IData } from "./types";
import { StyledContainerTables, StyledModal } from "./styles";

interface RequirementsModalProps {
  breakpoints: IBreakpoint[];
  loading: boolean;
  portalId: string;
  requirements: IData[];
  title: string;
  onCloseModal: () => void;
}

function RequirementsModal(props: RequirementsModalProps) {
  const { breakpoints, loading, portalId, requirements, title, onCloseModal } =
    props;

  const node = document.getElementById(portalId);

  if (!node) {
    throw new Error(
      "The portal node is not defined. This can occur when the specific node used to render the portal has not been defined correctly."
    );
  }

  return createPortal(
    <Blanket>
      <StyledModal>
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
            <Text type="body" size="medium" appearance="dark" ellipsis>
              No identificado
            </Text>
          </Stack>
        ) : (
          <StyledContainerTables>
            {requirements.map((requirement) => (
              <Stack direction="column" key={requirement.id}>
                <Table
                  id="portal"
                  titles={requirement.titlesRequirements}
                  actions={requirement.actionsRequirements}
                  entries={requirement.entriesRequirements}
                  loading={loading}
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
