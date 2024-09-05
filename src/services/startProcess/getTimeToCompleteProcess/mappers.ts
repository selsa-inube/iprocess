import { ITimeEstimedCompleteProcess} from "@pages/startProcess/types";

const mapTimeToCompleteProcessApiToEntity = (
  data:  Record<string, string | number | object> 
): ITimeEstimedCompleteProcess => {
  const processes: ITimeEstimedCompleteProcess = {
    totalPersons: Number(data.totalPersons),
    totalProcessedPersons: Number(data.totalProcessedPersons),
    duration: String(data.remainingDuration),
  };
  return processes;
};



export { mapTimeToCompleteProcessApiToEntity };
