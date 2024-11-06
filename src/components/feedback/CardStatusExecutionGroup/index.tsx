import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";

import { filteredExecutionStatusByPerson } from "@utils/requirements";
import { IProcessPersons } from "@pages/validateProgress/types";
import { AppContext } from "@context/AppContext";
import { normalizeDataPerson } from "@pages/validateProgress/components/ExecutionStatus/config/cardPerson.config";
import { peopleIncludedInProcess } from "@services/validateProgress/getPeopleIncludedInProcess";
import { tokens } from "@design/tokens";
import { CardStatusExecution } from "../CardStatusExecution";
import { IPersonProcess } from "../CardStatusExecution/types";
import { StyledCardStatusGroup } from "./styles";

interface CardStatusExecutionGroupProps {
  attributes: string[];
  filter: string;
  processControlId: string;
  filteredWithErrors?: boolean;
}

const CardStatusExecutionGroup = (props: CardStatusExecutionGroupProps) => {
  const { attributes, processControlId, filter, filteredWithErrors } = props;
  const { appData } = useContext(AppContext);
  const [loading, setLoading] = useState<boolean>(false);
  const divScroll = useRef<HTMLDivElement>(null);
  const [peopleIncludedData, setPeopleIncludedData] =
    useState<IProcessPersons[]>();
  const [page, setPage] = useState(1);
  const [personsProcessedWithErrors, setPersonsProcessedWithErrors] = useState("");

  const peopleIncludedInProcessData = async () => {
    setLoading(true);
    try {
      const newpeopleIncludedInProcess = await peopleIncludedInProcess(
        appData.businessUnit.publicCode,
        processControlId,
        String(page),
        personsProcessedWithErrors
      );
      setPeopleIncludedData((prevData) => [
        ...(prevData || []),
        ...newpeopleIncludedInProcess,
      ]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      throw new Error(
        `Error al obtener los datos: ${(error as Error).message} `
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    peopleIncludedInProcessData();
  }, []);

  const handleScroll = () => {
    if (
      divScroll.current &&
      Math.ceil(divScroll.current.scrollTop + divScroll.current.clientHeight) >=
        divScroll.current.scrollHeight &&
      !loading
    ) {
      peopleIncludedInProcessData();
    }
  };

  useEffect(() => {
    divScroll.current?.addEventListener("scroll", handleScroll);
    return () => divScroll.current?.removeEventListener("scroll", handleScroll);
  }, [loading]);

  useEffect(() => {
    if (filteredWithErrors) {
      setPersonsProcessedWithErrors("withErrors");
    } else {
      setPersonsProcessedWithErrors("");
    }
  }, [filteredWithErrors]);

  const filteredEntries = useMemo(() => {
    const mapAttributes = attributes.map((attr) => attr);

    const data = normalizeDataPerson(peopleIncludedData || []);

    return data?.filter((entry: IPersonProcess) => {
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
  }, [peopleIncludedData, filter, filteredWithErrors]);

  return (
    <>
      {peopleIncludedData && peopleIncludedData.length > 0 ? (
        <StyledCardStatusGroup ref={divScroll}>
          {loading && (
            <Stack gap={tokens.spacing.s200} width="100%" wrap="wrap">
              <CardStatusExecution isLoading={loading} />
              <CardStatusExecution isLoading={loading} />
              <CardStatusExecution isLoading={loading} />
            </Stack>
          )}
          {filteredEntries &&
            filteredEntries.map((entry, index) => (
              <Stack key={index}>
                <CardStatusExecution entries={entry} />
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
