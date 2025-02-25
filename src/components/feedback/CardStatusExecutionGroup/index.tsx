import { useContext, useEffect, useRef, useState } from "react";
import { Stack, Text } from "@inubekit/inubekit";

import { IDiscardPersonsWithErrorsResponse, IProcessPersons, IReprocessPersonsWithErrorsResponse } from "@pages/validateProgress/types";
import { AppContext } from "@context/AppContext";
import { normalizeDataPerson } from "@pages/validateProgress/components/ExecutionStatus/config/cardPerson.config";
import { peopleIncludedInProcess } from "@services/validateProgress/getPeopleIncludedInProcess";
import { tokens } from "@design/tokens";
import { CardStatusExecution } from "../CardStatusExecution";
import { StyledCardStatusGroup } from "./styles";

interface CardStatusExecutionGroupProps {
  filter: string;
  processControlId: string;
  filteredWithErrors?: boolean;
}

const CardStatusExecutionGroup = (props: CardStatusExecutionGroupProps) => {
  const {
    processControlId,
    filter,
    filteredWithErrors,
  } = props;
  const { appData } = useContext(AppContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [reprocessData, setReprocessData] = useState<
IReprocessPersonsWithErrorsResponse | undefined
>();

const [discardData, setDiscardData] = useState<
IDiscardPersonsWithErrorsResponse | undefined
>();
  const divScroll = useRef<HTMLDivElement>(null);
  const [peopleIncludedData, setPeopleIncludedData] =
    useState<IProcessPersons[]>();
  const [page, setPage] = useState(1);

  const peopleIncludedInProcessData = async (
    personsProcessedWithErrors: string = "",
    reset: boolean = false
  ) => {
    setLoading(true);
    try {
      let newpeopleIncludedInProcess: IProcessPersons[] = [];

      newpeopleIncludedInProcess = await peopleIncludedInProcess(
        appData.businessUnit.publicCode,
        processControlId,
        filter ? "" : String(reset ? 1 : page),
        personsProcessedWithErrors,
        filter.toUpperCase()
      );

      setPeopleIncludedData((prevData) =>
        reset
          ? newpeopleIncludedInProcess
          : [...(prevData || []), ...newpeopleIncludedInProcess]
      );
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
      if (!filteredWithErrors) {
        peopleIncludedInProcessData();
      } else {
        peopleIncludedInProcessData("ProcessedWithErrors", true);
      }
    }
  };

  useEffect(() => {
    divScroll.current?.addEventListener("scroll", handleScroll);
    return () => divScroll.current?.removeEventListener("scroll", handleScroll);
  }, [loading]);

  useEffect(() => {
    setPage(1);
    peopleIncludedInProcessData(
      filteredWithErrors ? "ProcessedWithErrors" : "",
      true
    );
  }, [filteredWithErrors]);

  useEffect(() => {
    if (discardData) {
      peopleIncludedInProcessData("ProcessedWithErrors", true);
    }
  }, [discardData]);

  useEffect(() => {
    if (reprocessData) {
      peopleIncludedInProcessData("ProcessedWithErrors", true);
    }
  }, [reprocessData]);

  useEffect(() => {
    if (filteredWithErrors) {
      peopleIncludedInProcessData("ProcessedWithErrors", true);
    } else {
      peopleIncludedInProcessData();
    }
    setPeopleIncludedData([]);
  }, [filter]);

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
          {peopleIncludedData &&
            normalizeDataPerson(peopleIncludedData, processControlId, setDiscardData, setReprocessData).map(
              (entry, index) => (
                <Stack key={index}>
                  <CardStatusExecution entries={entry} />
                </Stack>
              )
            )}
        </StyledCardStatusGroup>
      ) : (
        <Stack justifyContent="center" height="372px">
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
