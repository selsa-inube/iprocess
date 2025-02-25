import { Stack, Text, SkeletonIcon, SkeletonLine } from "@inubekit/inubekit";
import { ITagAppearance, Tag } from "@inubekit/tag";

import { tokens } from "@design/tokens";
import {
  normalizeexecutionStatusByPerson,
} from "@utils/requirements";
import { IActions, IPersonProcess } from "./types";
import { StyledAction, StyledContainer } from "./styles";

interface CardStatusExecutionProps {
  entries?: IPersonProcess;
  isLoading?: boolean;
}

function ShowAction(actionContent: IActions[], entry: IPersonProcess) {
  return (
    <>
      {actionContent.map((action) => (
        <StyledAction key={`${entry.processPersonId}-${action.id}`}>
          {action.content(entry)}
        </StyledAction>
      ))}
    </>
  );
}

const CardStatusExecution = (props: CardStatusExecutionProps) => {
  const { entries, isLoading } = props;

  return (
    <StyledContainer>
      <Stack direction="row" justifyContent="space-between">
        <Stack direction="column">
          {isLoading ? (
            <Stack direction="column" width="60px" gap={tokens.spacing.s025}>
              <SkeletonLine animated />
              <SkeletonLine animated />
            </Stack>
          ) : (
            <>
              <Text type="label" size="small" weight="bold">
                Estado
              </Text>
              <Tag
                label={
                  normalizeexecutionStatusByPerson(
                    entries?.executionStatusByPerson || ""
                  )?.name || ""
                }
                appearance={
                  (normalizeexecutionStatusByPerson(
                    entries?.executionStatusByPerson || "light"
                  )?.appearance as ITagAppearance) || "light"
                }
                weight="strong"
              />
            </>
          )}
        </Stack>
        <Stack direction="column">
          {isLoading ? (
            <Stack direction="column" width="60px" gap={tokens.spacing.s025}>
              <SkeletonLine animated />
              <SkeletonLine animated />
            </Stack>
          ) : (
            <>
              <Text type="label" size="small" weight="bold">
                Código
              </Text>
              <Text type="label" size="small">
                {entries?.personPublicCode}
              </Text>
            </>
          )}
        </Stack>
      </Stack>
      <Stack direction="column">
        {isLoading ? (
          <Stack direction="column" width="80%" gap={tokens.spacing.s025}>
            <SkeletonLine animated />
            <SkeletonLine animated />
          </Stack>
        ) : (
          <>
            <Text type="label" size="small" weight="bold">
              Nombre
            </Text>
            <Text type="label" size="small">
              {entries?.personName}
            </Text>
          </>
        )}
      </Stack>
      <Stack direction="row" justifyContent="space-between">
        {isLoading ? (
          <>
            <Stack direction="column" width="100%" gap={tokens.spacing.s025}>
              <SkeletonLine animated />
              <SkeletonLine animated />
            </Stack>
            <Stack direction="column" width="100%" gap={tokens.spacing.s025}>
              <SkeletonLine animated />
              <SkeletonLine animated />
            </Stack>
          </>
        ) : (
          <>
            <Stack direction="column">
              <Text type="label" size="small" weight="bold">
                Fecha y hora inicial
              </Text>
              <Text type="label" size="small">
                {entries?.startDate}
              </Text>
            </Stack>
            <Stack direction="column">
              <Text type="label" size="small" weight="bold">
                Fecha y hora final
              </Text>
              <Text type="label" size="small">
                {entries?.finishDate}
              </Text>
            </Stack>
          </>
        )}
      </Stack>
      <Stack gap={tokens.spacing.s150} justifyContent="flex-end">
        {isLoading ? (
          <Stack
            width="100px"
            gap={tokens.spacing.s025}
            justifyContent="flex-end"
          >
            <SkeletonIcon animated />
          </Stack>
        ) : (
          <>{entries?.actions && ShowAction(entries.actions, entries)}</>
        )}
      </Stack>
    </StyledContainer>
  );
};

export { CardStatusExecution };
export type { CardStatusExecutionProps };
