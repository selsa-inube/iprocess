import { useState } from "react";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { SkeletonIcon, SkeletonLine } from "@inubekit/skeleton";
import { Label } from "@inubekit/label";
import { Tag } from "@inubekit/tag";

import { tokens } from "@design/tokens";
import { normalizeStatusRequirementByStatus } from "@utils/requirements";
import { appearances } from "@pages/startProcess/types";
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
        <StyledAction key={`${entry.id}-${action.id}`}>
          {action.content(entry)}
        </StyledAction>
      ))}
    </>
  );
}

const CardStatusExecution = (props: CardStatusExecutionProps) => {
  const { entries, isLoading } = props;
  const [checkedCard, setCheckedCard] =useState<boolean>(false);


  const handleChangeManage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedCard(e.target.checked);
  };

  return (
    <StyledContainer>
      <Stack direction="row" justifyContent="space-between">
        {entries?.status === "Error" &&
          (isLoading ? (
            <Stack width="70px" gap={tokens.spacing.s025} justifyContent="center" alignItems="center">
              <SkeletonIcon animated />
              <SkeletonLine animated />
            </Stack>
          ) : (
            <Stack alignItems="center">
              <input
                readOnly
                type="checkbox"
                id="checkboxManage"
                name="checkboxManage"
                onChange={handleChangeManage}
                checked={checkedCard}
              />
              <Label size="medium" htmlFor="checkboxManage">
                Gestionar
              </Label>
            </Stack>
          ))}
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
                  normalizeStatusRequirementByStatus(entries?.status || "")
                    ?.name || ""
                }
                appearance={
                  (normalizeStatusRequirementByStatus(
                    entries?.status || "light"
                  )?.appearance as appearances) || "light"
                }
                weight="strong"
              />
            </>
          )}
        </Stack>
        <Stack direction="column">
          {isLoading ? (
            <Stack direction="column"  width="60px" gap={tokens.spacing.s025}>
              <SkeletonLine animated />
              <SkeletonLine animated />
            </Stack>
          ) : (
            <>
              <Text type="label" size="small" weight="bold">
                Código
              </Text>
              <Text type="label" size="small">
                {entries?.code}
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
              {entries?.namePerson}
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
                {entries?.dateStart}
              </Text>
            </Stack>
            <Stack direction="column">
              <Text type="label" size="small" weight="bold">
                Fecha y hora final
              </Text>
              <Text type="label" size="small">
                {entries?.dateEnd}
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
