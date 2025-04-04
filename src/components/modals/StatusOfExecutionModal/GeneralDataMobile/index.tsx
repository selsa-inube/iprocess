import { lazy, Suspense, useState } from "react";
import {
  Stack,
  Text,
  Toggle,
  Fieldset,
  Label,
  Input,
} from "@inubekit/inubekit";

import { tokens } from "@design/tokens";
import { Accordion } from "@components/data/Accordion";
import { StartProcesses } from "@pages/startProcess/types";
import { CardStatusExecution } from "@components/feedback/CardStatusExecution";
import { StyledFields } from "../styles";
import { ILabel } from "../types";
import { StyledContainerInput } from "./styles";

interface GeneralDataMobileProps {
  dataInformationProcess: StartProcesses;
  labels: ILabel[];
  processControlId: string;
  search: string;
  seeErrorsChecked: boolean;
  onChangeSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeToggle: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const GeneralDataMobile = (props: GeneralDataMobileProps) => {
  const {
    dataInformationProcess,
    labels,
    processControlId,
    search,
    seeErrorsChecked,
    onChangeSearch,
    onChangeToggle,
  } = props;

  const [isOpenDataGeneral, setIsOpenDataGeneral] = useState(true);
  const [isOpenPersons, setIsOpenPersons] = useState(false);

  const handleToggleOpen = () => {
    setIsOpenDataGeneral(!isOpenDataGeneral);
    setIsOpenPersons(!isOpenPersons);
  };

  const CardStatusExecutionGroupComponent = lazy(() =>
    import("@components/feedback/CardStatusExecutionGroup").then((module) => ({
      default: module.CardStatusExecutionGroup,
    }))
  );

  return (
    <>
      <Accordion
        title="Datos generales"
        divider={false}
        isOpen={isOpenDataGeneral}
        onToggleOpen={handleToggleOpen}
      >
        <Stack direction="column" gap={tokens.spacing.s200}>
          {labels.map((field, id) => {
            const value =
              dataInformationProcess[field.id as keyof StartProcesses];
            return value !== null &&
              value !== undefined &&
              (typeof value === "string" || typeof value === "number") ? (
              <StyledFields key={id}>
                <Fieldset
                  legend=""
                  spacing="compact"
                  type="title"
                  size="medium"
                >
                  <Stack
                    direction="column"
                    gap={tokens.spacing.s025}
                    width="100%"
                  >
                    <Text type="label" size="medium" weight="bold">
                      {field.titleName}
                    </Text>
                    <Text type="body" size="small">
                      {value}
                    </Text>
                  </Stack>
                </Fieldset>
              </StyledFields>
            ) : null;
          })}
        </Stack>
      </Accordion>
      <Accordion
        title="Personas incluidas en el proceso"
        divider={true}
        isOpen={isOpenPersons}
        onToggleOpen={handleToggleOpen}
      >
        <Stack direction="column">
          <Stack
            direction="row"
            gap={tokens.spacing.s100}
            justifyContent="left"
          >
            <Toggle
              checked={seeErrorsChecked}
              id="seeErrors"
              margin={tokens.spacing.s0}
              name="seeErrors"
              onChange={onChangeToggle}
              padding={tokens.spacing.s0}
              value={"seeErrors"}
              size="small"
            />
            <Label htmlFor="seeErrors" size="medium">
              Ver errores
            </Label>
          </Stack>
          <StyledContainerInput>
            <Input
              placeholder="Palabra clave..."
              type="search"
              name="search"
              id="search"
              value={search}
              onChange={onChangeSearch}
              size="compact"
            />
          </StyledContainerInput>
        </Stack>
        <Suspense
          fallback={
            <Stack
              gap={tokens.spacing.s200}
              width="100%"
              wrap="wrap"
              height="372px"
            >
              <CardStatusExecution isLoading={true} />
            </Stack>
          }
        >
          <CardStatusExecutionGroupComponent
            processControlId={processControlId}
            filter={search}
            filteredWithErrors={seeErrorsChecked}
          />
        </Suspense>
      </Accordion>
    </>
  );
};

export { GeneralDataMobile };
