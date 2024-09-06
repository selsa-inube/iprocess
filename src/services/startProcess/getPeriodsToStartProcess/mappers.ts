import { IListPeriods } from "@pages/startProcess/types";

const mapListPeriodStartProcessApiToEntity = (
  period: Record<string, string | number | object>
): IListPeriods => {
  const periodStartProcess: IListPeriods = {
    numberMonth: Number(period.numberMonth),
    month: String(period.month),
    year: Number(period.year),
  };
  return periodStartProcess;
};

const mapListPeriodStartProcessApiToEntities = (
  periods: Record<string, string | number | object>[]
): IListPeriods[] => {
  return periods.map((period) => mapListPeriodStartProcessApiToEntity(period));
};

export {
  mapListPeriodStartProcessApiToEntity,
  mapListPeriodStartProcessApiToEntities,
};
