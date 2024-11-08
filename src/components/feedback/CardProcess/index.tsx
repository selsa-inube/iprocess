import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { Link } from "@inubekit/link";
import { SkeletonIcon, SkeletonLine } from "@inubekit/skeleton";

import { tokens } from "@design/tokens";
import { IActions, IProcess } from "./types";
import { StyledAction, StyledContainer } from "./styles";


interface CardProcessProps {
  entries?: IProcess;
  optionCurrent?:
    | "start process"
    | "confirm initiated"
    | "validate process"
    | "finished";
  descriptionTooltip?: string;
  pathDetailByDay?: string;
  isLoading?: boolean;
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
  const { entries, optionCurrent, pathDetailByDay, isLoading } = props;

  return (
    <StyledContainer>
      <Stack height="48px" alignItems="center">
        {isLoading ? (
          <Stack direction="column" width="100%">
            <SkeletonLine animated />
          </Stack>
        ) : (
          <Text type="body" size="small">
            {entries && entries.description && entries.description?.length > 100
              ? entries?.description?.slice(0, 100) + "..."
              : entries?.description}
          </Text>
        )}
      </Stack>

      {(optionCurrent === "validate process" ||
        optionCurrent === "finished") && (
        <>
          <Stack direction="column" gap={tokens.spacing.s025}>
            {isLoading ? (
              <Stack direction="column" width="100%" gap={tokens.spacing.s025}>
                <SkeletonLine animated />
                <SkeletonLine animated />
              </Stack>
            ) : (
              <>
                <Text
                  type="label"
                  size="medium"
                  weight="bold"
                  appearance="gray"
                >
                  Total personas que cubre el proceso
                </Text>
                <Text type="body" size="small">
                  {entries?.totalPersonsCoversProcess}
                </Text>
              </>
            )}
          </Stack>

          <Stack direction="column" gap={tokens.spacing.s025}>
            {isLoading ? (
              <Stack direction="column" width="100%" gap={tokens.spacing.s025}>
                <SkeletonLine animated />
                <SkeletonLine animated />
              </Stack>
            ) : (
              <>
                <Text
                  type="label"
                  size="medium"
                  weight="bold"
                  appearance="gray"
                >
                  Total personas procesadas
                </Text>
                <Text type="body" size="small">
                  {entries?.totalPersonsProsecuted }
                </Text>
              </>
            )}
          </Stack>
        </>
      )}
      <Stack direction="row" gap={tokens.spacing.s400}>
        {(optionCurrent !== "finished" && optionCurrent !== "validate process" ) && (
          <Stack
            direction="column"
            gap={tokens.spacing.s025}
            width="90px"
            padding={tokens.spacing.s0}
          >
            {isLoading ? (
              <Stack direction="column" width="100%" gap={tokens.spacing.s025}>
                <SkeletonLine animated />
                <SkeletonLine animated />
              </Stack>
            ) : (
              <>
                <Text
                  type="label"
                  size="medium"
                  weight="bold"
                  appearance="gray"
                >
                  Requisitos
                </Text>
                <Stack gap={tokens.spacing.s050} direction="row">
                  <Stack>{entries?.status}</Stack>
                </Stack>
              </>
            )}
          </Stack>
        )}

        <Stack direction="column" gap={tokens.spacing.s025}>
          {isLoading ? (
            <Stack direction="column" width="120px" gap={tokens.spacing.s025}>
              <SkeletonLine animated />
              <SkeletonLine animated />
            </Stack>
          ) : (
            <>
              <Text type="label" size="medium" weight="bold" appearance="gray">
                {typeof entries?.date === "undefined" ||
                (entries.periodicity && entries.periodicity === "Diario")
                  ? "Diarios"
                  : "Fecha"}
              </Text>

              <Stack>
                {!entries?.date ||
                (typeof entries.date === "undefined" &&
                  entries.periodicity &&
                  entries.periodicity === "Diario") ? (
                  <Link size="small" type="body" path={pathDetailByDay!}>
                    Ver Detalle por día
                  </Link>
                ) : (
                  <Text type="body" size="small">
                    {String(entries.date)}
                  </Text>
                )}
              </Stack>
            </>
          )}
        </Stack>

        {optionCurrent === "finished" && (
          <Stack direction="column" gap={tokens.spacing.s025}>
            {isLoading ? (
              <Stack direction="column" width="75px" gap={tokens.spacing.s025}>
                <SkeletonLine animated />
                <SkeletonLine animated />
              </Stack>
            ) : (
              <>
                <Text
                  type="label"
                  size="medium"
                  weight="bold"
                  appearance="gray"
                >
                  Duración (Segundos)
                </Text>

                <Stack>
                  <Text type="body" size="small">
                    {entries?.duration}
                  </Text>
                </Stack>
              </>
            )}
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
              {isLoading ? (
                <Stack
                  direction="column"
                  width="100px"
                  gap={tokens.spacing.s025}
                >
                  <SkeletonLine animated />
                  <SkeletonLine animated />
                </Stack>
              ) : (
                <>
                  <Text
                    type="label"
                    size="medium"
                    weight="bold"
                    appearance="gray"
                  >
                    Total personas
                  </Text>
                  <Text type="body" size="small">
                    {entries?.totalPerson}
                  </Text>
                </>
              )}
            </>
          )}
        </Stack>
        <Stack alignContent="flex-end" gap={tokens.spacing.s150}>
          {isLoading ? (
            <Stack
              width="100px"
              gap={tokens.spacing.s025}
              justifyContent="flex-end"
            >
              <SkeletonIcon animated />
              <SkeletonIcon animated />
            </Stack>
          ) : (
            <>{entries?.actions && ShowAction(entries.actions, entries)}</>
          )}
        </Stack>
      </Stack>
    </StyledContainer>
  );
};

export { CardProcess };
export type { CardProcessProps };
