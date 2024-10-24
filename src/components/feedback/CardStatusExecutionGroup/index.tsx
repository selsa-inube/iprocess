import { useMemo } from "react";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";

import { CardStatusExecution } from "../CardStatusExecution";
import { IPersonProcess } from "../CardStatusExecution/types";
import { StyledCardStatusGroup } from "./styles";

interface CardStatusExecutionGroupProps {
  attributes: string[];
  entries?: IPersonProcess[];
  filter: string;
}

const CardStatusExecutionGroup = (props: CardStatusExecutionGroupProps) => {
  const { attributes, entries, filter } = props;

  const filteredEntries = useMemo(() => {
    const mapAttributes = attributes.map((attr) => attr);

    return entries?.filter((entry: IPersonProcess) => {
      for (const attr in entry) {
        if (
          mapAttributes.includes(attr) &&
          entry[attr as keyof IPersonProcess]
            ?.toString()
            .toLowerCase()
            .includes(filter.toLowerCase())
        ) {
          return true;
        }
      }
      return false;
    });
  }, [entries, filter]);

  return (
    <>
      {entries && entries.length > 0 ? (
        <StyledCardStatusGroup>
          {filteredEntries && filteredEntries.map((entry, index) => (
            <Stack key={index}>
              <CardStatusExecution 
                entries={entry}
              />
            </Stack>
          ))}
        </StyledCardStatusGroup>
      ) : (
        <Text type="body" size="medium">
          No se encontró información
        </Text>
      )}
    </>
  );
};

export { CardStatusExecutionGroup };
export type { CardStatusExecutionGroupProps };
