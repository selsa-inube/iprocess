import { MdClear } from "react-icons/md";
import { createPortal } from "react-dom";

import { Button } from "@inubekit/button";
import { Divider } from "@inubekit/divider";
import { useMediaQuery } from "@inubekit/hooks";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { Blanket } from "@inubekit/blanket";
import { Fieldset } from "@inubekit/fieldset";
import { Label } from "@inubekit/label";

import { Table } from "@components/data/Table";
import { IBreakpoint, ITitle } from "@components/data/Table/props";
import { mediaQueryMobile } from "@src/config/environment";
import { StyledContainer, StyledModal, StyledModalFields } from "./styles";
import { IEntries, ILabel } from "../MoreDetailsModal/types";
import { tokens } from "@src/design/tokens";


interface ExecutionParametersModalProps {
  isVisible: boolean;
  portalId: string;
  data: IEntries;
  labels: ILabel[];
  titlesParametersTable: ITitle[];
  entriesParametersTable: IEntries[];
  breakPointsParametersTable: IBreakpoint[];
  onCloseModal: () => void;
}

const ExecutionParametersModal = (props: ExecutionParametersModalProps) => {
  const {
    breakPointsParametersTable,
    data,
    labels,
    isVisible,
    entriesParametersTable,
    portalId,
    titlesParametersTable,
    onCloseModal,
  } = props;

  const isMobile = useMediaQuery(mediaQueryMobile);

  const node = document.getElementById(portalId);

  if (!node) {
    throw new Error(
      "The portal node is not defined. This can occur when the specific node used to render the portal has not been defined correctly."
    );
  }

  return createPortal(
    <StyledContainer>
      <Blanket>
        <StyledModal $smallScreen={isMobile}>
          <Stack direction="column" gap={tokens.spacing.s200}>
            <Stack direction="column" gap={tokens.spacing.s250}>
              <Stack direction="column" gap={tokens.spacing.s100}>
                <Stack alignItems="center" justifyContent="space-between">
                  <Text type="title" size="medium" appearance="dark">
                    Parámetros de Ejecución
                  </Text>
                  <MdClear size={tokens.spacing.s300} cursor="pointer" onClick={onCloseModal} />
                </Stack>
              </Stack>

              <Divider dashed />

              {labels.map(
                (field, id) =>
                  data[field.id] && (
                    <StyledModalFields key={id} $smallScreen={isMobile}>
                      <Label
                        htmlFor={field.id}
                        size="large"
                        margin={`${tokens.spacing.s0} ${tokens.spacing.s0} ${tokens.spacing.s0} ${tokens.spacing.s200}`}
                      >
                        {field.titleName}
                      </Label>
                      <Fieldset legend="" spacing="compact">
                        <Text type="body" size="medium">
                          {data[field.id]}
                        </Text>
                      </Fieldset>
                    </StyledModalFields>
                  )
              )}
              <Divider dashed />
              <Table
                id="modals"
                titles={titlesParametersTable}
                entries={entriesParametersTable}
                breakpoints={breakPointsParametersTable}
                isLoading={isVisible}
                widthFirstColumn="65%"
              />
            </Stack>
            <Stack gap={tokens.spacing.s100} justifyContent="flex-end">
              <Button
                spacing="wide"
                appearance="primary"
                variant="filled"
                loading={isVisible}
                onClick={onCloseModal}
              >
                Cerrar
              </Button>
            </Stack>
          </Stack>
        </StyledModal>
      </Blanket>
    </StyledContainer>,
    node
  );
};

export { ExecutionParametersModal };
export type { ExecutionParametersModalProps };
