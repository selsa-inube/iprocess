import { useMemo } from "react";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";

import { filteredExecutionStatusByPerson } from "@utils/requirements";
import { CardStatusExecution } from "../CardStatusExecution";
import { IPersonProcess } from "../CardStatusExecution/types";
import { StyledCardStatusGroup } from "./styles";

interface CardStatusExecutionGroupProps {
  attributes: string[];
  filter: string;
  entries?: IPersonProcess[];
  filteredWithErrors?: boolean;
  handleProcessPersonId?: (id: string | undefined, check: boolean) => void;
}

const CardStatusExecutionGroup = (props: CardStatusExecutionGroupProps) => {
  const {
    attributes,
    entries,
    filter,
    filteredWithErrors,
    handleProcessPersonId,
  } = props;

  const filteredEntries = useMemo(() => {
    const mapAttributes = attributes.map((attr) => attr);

    return entries?.filter((entry: IPersonProcess) => {
      const matchesFilter = filter
        ? mapAttributes.some((attr) =>
            entry[attr as keyof IPersonProcess]
              ?.toString()
              .toLowerCase()
              .includes(filter.toLowerCase())
          )
        : true;

      const matchesError = filteredWithErrors
        ? entry?.executionStatusByPerson &&
          filteredExecutionStatusByPerson.includes(
            entry.executionStatusByPerson
          )
        : true;

      return matchesFilter && matchesError;
    });
  }, [entries, filter, filteredWithErrors]);

  return (
    <>
      {entries && entries.length > 0 ? (
        <StyledCardStatusGroup>
          {filteredEntries &&
            filteredEntries.map((entry, index) => (
              <Stack key={index}>
                <CardStatusExecution
                  entries={entry}
                  handleProcessPersonId={handleProcessPersonId}
                />
              </Stack>
            ))}
        </StyledCardStatusGroup>
      ) : (
        <Stack justifyContent="center">
          <Text type="body" size="medium">
            No se encontró información
          </Text>
        </Stack>
      )}
    </>
  );
};

export { CardStatusExecutionGroup };
export type { CardStatusExecutionGroupProps };
