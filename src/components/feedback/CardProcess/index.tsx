import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";

import { tokens } from "@src/design/tokens";
import { IActions, IProcess } from "./types";
import { StyledAction, StyledContainer, StyledStatus } from "./styles";
import { Tooltip } from "../../../design/feedback/Tooltip";

interface CardProcessProps {
  entries: IProcess;
  optionCurrent:
    | "start process"
    | "confirm initiated"
    | "validate process"
    | "finished";

  descriptionTooltip: string;
}

function ShowAction(actionContent: IActions[], entry: IProcess) {
  return (
    <>
      {actionContent.map((action) => (
        <StyledAction key={`${entry.id}-${action.id}`}>
          {action.content(entry)}
        </StyledAction>
      ))}
    </>
  );
}

const CardProcess = (props: CardProcessProps) => {
  const { entries, optionCurrent, descriptionTooltip } = props;

  return (
    <StyledContainer>
      <Stack>
        <Text type="body" size="small">
          {entries.description.toUpperCase()}
        </Text>
      </Stack>

      {(optionCurrent === "validate process" ||
        optionCurrent === "finished") && (
        <>
          <Stack direction="column" gap={tokens.spacing.s025}>
            <Text type="label" size="medium" weight="bold" appearance="gray">
              Total personas que cubre el proceso
            </Text>
            <Text type="body" size="small">
              {entries.totalPersonsCoversProcess}
            </Text>
          </Stack>

          <Stack direction="column" gap={tokens.spacing.s025}>
            <Text type="label" size="medium" weight="bold" appearance="gray">
              Total personas procesadas
            </Text>
            <Text type="body" size="small">
              {entries.totalPersonsProsecuted}
            </Text>
          </Stack>
        </>
      )}
      <Stack direction="row" gap={tokens.spacing.s400}>
        {optionCurrent !== "finished" && (
          <Stack
            direction="column"
            gap={tokens.spacing.s025}
            width="93px"
            padding={tokens.spacing.s0}
          >
            <Text type="label" size="medium" weight="bold" appearance="gray">
              {optionCurrent === "validate process" ? "Estado" : "Requisitos"}
            </Text>
            <Stack gap={tokens.spacing.s050} direction="row">
              <StyledStatus>{entries.status}</StyledStatus>

              {optionCurrent !== "validate process" &&
                (entries.statusText === "Sin Evaluar" ||
                  entries.statusText === "No Cumple") && (
                  <Tooltip description={descriptionTooltip} />
                )}
            </Stack>
          </Stack>
        )}

        <Stack direction="column" gap={tokens.spacing.s025}>
          <Text type="label" size="medium" weight="bold" appearance="gray">
            {optionCurrent !== "finished" && (typeof entries.date === "undefined" ||
            (entries.periodicity && entries.periodicity === "Diaria"))
              ? "Diarios"
              : "Fecha"}
          </Text>

          <Stack>
            <Text type="body" size="small">
              {typeof entries.date === "undefined" ||
              (entries.periodicity && entries.periodicity === "Diaria")
                ? "Ver Detalle por día"
                : String(entries.date)}
            </Text>
          </Stack>
        </Stack>

        {optionCurrent === "finished" && (
          <Stack direction="column" gap={tokens.spacing.s025}>
            <Text type="label" size="medium" weight="bold" appearance="gray">
              Duración (Minutos)
            </Text>

            <Stack>
              <Text type="body" size="small">
                {entries.duration}
              </Text>
            </Stack>
          </Stack>
        )}
      </Stack>

      <Stack
        gap={tokens.spacing.s250}
        direction="row"
        justifyContent="space-between"
      >
        <Stack direction="column">
          {optionCurrent === "confirm initiated" && (
            <>
              <Text type="label" size="medium" weight="bold" appearance="gray">
                Total personas
              </Text>
              <Text type="body" size="small">
                {entries.totalPersons}
              </Text>
            </>
          )}
        </Stack>
        <Stack alignContent="flex-end" gap={tokens.spacing.s150}>
          {entries.actions && ShowAction(entries.actions, entries)}
        </Stack>
      </Stack>
    </StyledContainer>
  );
};

export { CardProcess };
export type { CardProcessProps };
