import { ITimeEstimedCompleteProcess} from "@pages/startProcess/types";

const mapTimeToCompleteProcessApiToEntity = (
  data:  Record<string, string | number | object> 
): ITimeEstimedCompleteProcess => {
  const processes: ITimeEstimedCompleteProcess = {
    secondsTime: Number(data.secondsTimeToInsertPeople),
  };
  return processes;
};



export { mapTimeToCompleteProcessApiToEntity };
