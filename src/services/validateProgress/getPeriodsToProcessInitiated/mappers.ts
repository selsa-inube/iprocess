import { IListPeriods } from "@pages/startProcess/types";

const mapListPeriodToProcessInitiatedApiToEntity = (
  period: Record<string, string | number | object>
): IListPeriods => {
  const periodToProcessInitiated: IListPeriods = {
    numberMonth: Number(period.numberMonth),
    month: String(period.month),
    year: Number(period.year),
  };
  return periodToProcessInitiated;
};

const mapListPeriodToProcessInitiatedApiToEntities = (
  periods: Record<string, string | number | object>[]
): IListPeriods[] => {
  return periods.map((period) => mapListPeriodToProcessInitiatedApiToEntity(period));
};

export {
  mapListPeriodToProcessInitiatedApiToEntity,
  mapListPeriodToProcessInitiatedApiToEntities,
};
