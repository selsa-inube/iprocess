import {
  MdImportExport,
} from "react-icons/md";
import { Icon } from "@inubekit/icon";
import { Text } from "@inubekit/text";

import { IActions, ITitle } from "@components/data/Table/props";
import { StyledContainerTitle } from "@components/data/Table/stories/styles";
import { IDailyDetail, StartProcesses } from "@pages/startProcess/types";
import { formatDate } from "@utils/dates";
import { ScheduledRequirements } from "../../ScheduledRequirements";
import { DetailsProcessDaily } from "../components/DetailsProcessDaily";
import { StartProcessScheduled } from "../../StartProcess";

const processesDailyNormailzeEntries = (
  process: IDailyDetail[],
  month: number,
  year: number,
  status: string,
  setStatus: (status: string) => void
) =>
  process.map((entry) => ({
    ...entry,
    id: String(`${entry.processCatalogId}${entry.estimatedExecutionDate}`),
    processCatalogId: entry.processCatalogId,
    description: entry.abbreviatedName,
    date:
      entry.estimatedExecutionDate &&
      formatDate(new Date(entry.estimatedExecutionDate)),
    requirements: (
      <ScheduledRequirements
        id={entry.processCatalogId}
        month={month}
        publicCode={entry.publicCode}
        plannedExecution={
          entry.estimatedExecutionDate
            ? new Date(entry.estimatedExecutionDate)
            : undefined
        }
        year={year}
        setStatus={setStatus}
        status={status}
        withTooltip={false}
      />
    ),
    statusText: status,
    month: month,
    year: year,
    dateWithoutFormat: entry.estimatedExecutionDate,
  }));

  const mapScheduled = (entry: IActions) => {
    return {
      id: entry.id,
      publicCode: entry.publicCode,
      aplication: entry.aplication,
      date: entry.estimatedExecutionDate,
      process: entry.description,
      statusText: entry.statusText,
      month: entry.month,
      year: entry.year,
    };
  };

  const mapStartProcessScheduled = (entry: StartProcesses) => {
    const formatDescriptionSuggested = 
      `${entry.description} Del mes de ${entry.month} del año ${entry.year}, fecha estimada de ejecución es ${entry.date}`;
    return {
      id: entry.description,
      descriptionSuggested: formatDescriptionSuggested,
      publicCode: entry.publicCode,
      date: entry.dateWithoutFormat,
      month: entry.month,
      year: entry.year,
    };
  };

const titlesConfig = (handleOrderData: () => void) => {
  const titles: ITitle[] = [
    {
      id: "date",
      titleName: (
        <StyledContainerTitle>
          <Text
            type="title"
            size="small"
            appearance="dark"
            textAlign="start"
            weight="bold"
          >
            Fecha estimada de ejecución
          </Text>

          <Icon
            appearance="dark"
            icon={<MdImportExport />}
            size="16px"
            onClick={() => handleOrderData()}
            cursorHover
          />
        </StyledContainerTitle>
      ),
      priority: 0,
    },
    {
      id: "requirements",
      titleName: "Requisitos",
      priority: 1,
    },
  ];

  return titles;
};


const actionsConfig = (url: string) => {
  const actions = [
    {
      id: "Details",
      actionName: "Detalles",
      content: (process: StartProcesses) => (
        <DetailsProcessDaily
          data={mapScheduled(process)}
          breakpoints={breakPoints}
        />
      ),
    },
    {
      id: "StartProcess",
      actionName: "Iniciar Proceso",
      content: (process: StartProcesses) =>
          <StartProcessScheduled
            dataModal={mapStartProcessScheduled(process)}
            id={process.id}
            urlParams={url}
          />
     
    },
  ];

  return actions;
}


const breakPoints = [{ breakpoint: "(min-width: 1091px)", totalColumns: 3 }];

export { titlesConfig, actionsConfig, breakPoints, processesDailyNormailzeEntries };
