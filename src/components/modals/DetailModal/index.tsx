import { createPortal } from "react-dom";
import { MdClear } from "react-icons/md";
import { Fieldset } from "@inubekit/fieldset";
import { useMediaQuery, Stack, Text } from "@inubekit/inubekit";
import { Label } from "@inubekit/label";
import { Button } from "@inubekit/button";
import { Divider } from "@inubekit/divider";
import { Blanket } from "@inubekit/blanket";
import { ITagAppearance, Tag } from "@inubekit/tag";

import { Table } from "@components/data/Table";
import { IBreakpoint } from "@components/data/Table/props";
import { normalizeStatusRequirementByName } from "@utils/requirements";
import { mediaQueryMobile } from "@config/environment";
import { tokens } from "@design/tokens";
import {
  StyledContainer,
  StyledContainerTables,
  StyledDataContainer,
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
  onCloseModal: () => void;
  requirement?: IData[];
  breakpoints?: IBreakpoint[];
  isVisible?: boolean;
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

  const isMobile = useMediaQuery(mediaQueryMobile);

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
          <Stack direction="column" gap={tokens.spacing.s250}>
            <Stack direction="column" gap={tokens.spacing.s200} height="300px">
              <Stack direction="column" gap={tokens.spacing.s100}>
                <Stack alignItems="center" justifyContent="space-between">
                  <Text type="title" size="medium" appearance="dark">
                    {title}
                  </Text>
                  <MdClear size={24} cursor="pointer" onClick={onCloseModal} />
                </Stack>
              </Stack>

              <Divider dashed />

              <StyledDataContainer>
                {labels.slice(0, partOfLabels).map(
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
                        <Fieldset
                          legend=""
                          spacing="compact"
                          type="title"
                          size="large"
                        >
                          <Text type="body" size="medium">
                            {data[field.id]}
                          </Text>
                        </Fieldset>
                      </StyledModalFields>
                    )
                )}

                {labels.slice(partOfLabels).map(
                  (field, id) =>
                    data[field.id] && (
                      <Stack key={id} gap={tokens.spacing.s200}>
                        <Label
                          htmlFor={field.id}
                          size="small"
                          margin={`${tokens.spacing.s0} ${tokens.spacing.s0} ${tokens.spacing.s0} ${tokens.spacing.s200}`}
                        >
                          {field.titleName}
                        </Label>
                        <Tag
                          appearance={
                            (normalizeStatusRequirementByName(data[field.id])
                              ?.appearance as ITagAppearance) || "gray"
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

                {requirement && data.statusText === "Cumple" && (
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
                              isLoading={isVisible || false}
                              widthFirstColumn="100%"
                              multipleTables={true}
                              typeTitle={"label"}
                            />
                          </Stack>
                        ))}
                  </StyledContainerTables>
                )}
              </StyledDataContainer>
            </Stack>

            <Stack gap={tokens.spacing.s100} justifyContent="flex-end">
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
