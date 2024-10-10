import { StartProcesses, StartProcessesFilter } from "@pages/startProcess/types";
import { periodicityValuesMock } from "@mocks/startProcess/utils.mocks";

const mapStartProcessApiToEntity = (
  process: Record<string, string | number | object>
): StartProcesses => {

  const processes: StartProcesses = {
    id: String(process.processCatalogId),
    publicCode: String(process.publicCode),
    description: String(process.abbreviatedName),
    date: process.estimatedExecutionDate ? new Date(String(process.estimatedExecutionDate)) : undefined,
    aplication: Object(process.application),
    periodicity: periodicityValuesMock[String(process.periodicity)],
    dateWithoutFormat: String(process.estimatedExecutionDate),
    url: String(process.urlExecutionParameters),
    dailyDetail: Object(process.dailyDetail),
    executionWay: String(process.executionWay),
  };
  return processes;
};

const mapStartProcessApiToEntities = (
  processes: Record<string, string | number | object>[]
): StartProcessesFilter => {
  const onDemand: StartProcesses[] = [];
  const scheduled: StartProcesses[] = [];
  processes.map(mapStartProcessApiToEntity).filter((startProcess) => {
   
    if (startProcess.periodicity !== periodicityValuesMock["OnDemand"])
      scheduled.push(startProcess);

    if (startProcess.periodicity === periodicityValuesMock["OnDemand"])
      onDemand.push(startProcess);
  });

  return {
    onDemand: onDemand,
    scheduled: scheduled
  }
};

export { mapStartProcessApiToEntity, mapStartProcessApiToEntities };
