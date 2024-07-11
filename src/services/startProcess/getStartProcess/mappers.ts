import { StartProcesses, StartProcessesFilter } from "@pages/startProcess/types";
import { periodicityValuesMock } from "@mocks/startProcess/utils.mocks";


const mapStartProcessApiToEntity = (
  process: Record<string, string | number | object>
): StartProcesses => {
  const processes: StartProcesses = {
    id: String(process.processCatalogId),
    abbreviatedName: String(process.abbreviatedName),
    executionDate: new Date(String(process.estimatedExecutionDate)),
    aplication: String(process.aplication),
    periodicity: periodicityValuesMock[String(process.periodicity)],
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
    scheduled: scheduled.sort((a, b) => b.executionDate.getTime() - a.executionDate.getTime())
  }
};

export { mapStartProcessApiToEntity, mapStartProcessApiToEntities };
