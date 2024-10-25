import { createPortal } from "react-dom";
import { MdClear } from "react-icons/md";
import { Fieldset } from "@inubekit/fieldset";
import { Label } from "@inubekit/label";
import { Button } from "@inubekit/button";
import { Divider } from "@inubekit/divider";
import { useMediaQuery } from "@inubekit/hooks";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { Blanket } from "@inubekit/blanket";
import { Tag } from "@inubekit/tag";

import { Table } from "@components/data/Table";
import { IBreakpoint } from "@components/data/Table/props";
import { appearances } from "@pages/startProcess/types";
import { normalizeStatusRequirementByName } from "@utils/requirements";
import {
  StyledContainer,
  StyledContainerTables,
  StyledModal,
  StyledModalFields,
} from "./styles";
import { IEntries, ILabel } from "./types";
import { IData } from "../requirementsModal/types";


interface DetailModalProps {
  portalId: string;
  title: string;
  data: IEntries;
  labels: ILabel[];
  requirement: IData[];
  breakpoints: IBreakpoint[];
  isVisible: boolean;
  onCloseModal: () => void;
}

const DetailModal = (props: DetailModalProps) => {
  const {
    portalId,
    title,
    data,
    breakpoints,
    labels,
    requirement,
    isVisible,
    onCloseModal,
  } = props;

  const isMobile = useMediaQuery("(max-width: 500px)");

  const node = document.getElementById(portalId);

  const partOfLabels = labels.length - 1;

  if (!node) {
    throw new Error(
      "The portal node is not defined. This can occur when the specific node used to render the portal has not been defined correctly."
    );
  }

  return createPortal(
    <StyledContainer>
      <Blanket>
        <StyledModal $smallScreen={isMobile}>
          <Stack direction="column" gap="20px">
            <Stack direction="column" gap="16px">
              <Stack direction="column" gap="8px">
                <Stack alignItems="center" justifyContent="space-between">
                  <Text type="title" size="medium" appearance="dark">
                    {title}
                  </Text>
                  <MdClear size={24} cursor="pointer" onClick={onCloseModal} />
                </Stack>
              </Stack>

              <Divider dashed />

              {labels.slice(0, partOfLabels).map(
                (field, id) =>
                  data[field.id] && (
                    <StyledModalFields key={id} $smallScreen={isMobile}>
                      <Label
                        htmlFor={field.id}
                        size="large"
                        margin="0px 0px 0px 16px"
                      >
                        {field.titleName}
                      </Label>
                      <Fieldset legend="" spacing="compact" type="title" size="large">
                        <Text>{data[field.id]}</Text>
                      </Fieldset>
                    </StyledModalFields>
                  )
              )}
              {labels.slice(partOfLabels).map(
                (field, id) =>
                  data[field.id] && (
                    <Stack key={id} gap="16px">
                      <Label
                        htmlFor={field.id}
                        size="small"
                        margin="0px 0px 0px 16px"
                      >
                        {field.titleName}
                      </Label>
                      <Tag
                        appearance={
                          normalizeStatusRequirementByName(data[field.id])
                            ?.appearance as appearances || "gray"
                        }
                        label={
                          normalizeStatusRequirementByName(data[field.id])
                            ?.name || ""
                        }
                        weight="strong"
                      />
                    </Stack>
                  )
              )}
            </Stack>

            {data.statusText === "Cumple" && (
              <StyledContainerTables>
                {requirement.length === 0
                  ? "No se han encontrado resultados"
                  : requirement.map((requirement) => (
                      <Stack direction="column" key={requirement.id}>
                        <Table
                          id="portal"
                          titles={requirement.titlesRequirements}
                          entries={requirement.entriesRequirements}
                          breakpoints={breakpoints}
                          isLoading={isVisible}
                          widthFirstColumn="100%"
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
          </Stack>
        </StyledModal>
      </Blanket>
    </StyledContainer>,
    node
  );
};

export { DetailModal };
export type { DetailModalProps };
