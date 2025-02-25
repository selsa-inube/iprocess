import { useMemo } from "react";
import { useMediaQuery, Stack, Text } from "@inubekit/inubekit";

import { tokens } from "@design/tokens";
import { IProcess } from "../CardProcess/types";
import { CardProcess } from "../CardProcess";

interface CardProcessGroupProps {
  attributes: string[];
  entries: IProcess[];
  filter: string;
  optionCurrent:
  | "start process"
  | "confirm initiated"
  | "validate process"
  | "finished"
  | undefined;
  descriptionTooltip?: string;
    month?: string;
  year?: string;
  pathDetailByDay?: string;
}

const CardProcessGroup = (props: CardProcessGroupProps) => {
  const {
    attributes,
    descriptionTooltip,
    entries,
    filter = "",
    month,
    optionCurrent,
    year,
    pathDetailByDay,
  } = props;
  const smallScreen = useMediaQuery("(max-width: 690px)");
  const filteredEntries = useMemo(() => {
    const mapAttributes = attributes.map((attr) => attr);

    return entries.filter((entry: IProcess) => {
      for (const attr in entry) {
        if (
          mapAttributes.includes(attr) &&
          entry[attr as keyof IProcess]
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
      {entries.length > 0 ? (
        <Stack gap={tokens.spacing.s200} width="100%" wrap="wrap" justifyContent={smallScreen ? "center" : "inherit"} >
          {filteredEntries.map((entry, index) => (
            <Stack key={index}>
              <CardProcess
                entries={entry as IProcess}
                optionCurrent={optionCurrent}
                descriptionTooltip={descriptionTooltip}
                pathDetailByDay={
                  pathDetailByDay?.length
                    ? `/${pathDetailByDay}/${month}/${year}/${entry.id}`
                    : "/"
                }
              />
            </Stack>
          ))}
        </Stack>
      ) : (
        <Text type="body" size="medium">
          No se encontró información
        </Text>
      )}
    </>
  );
};

export { CardProcessGroup };
export type { CardProcessGroupProps };
