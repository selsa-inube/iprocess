import { IServerDomain } from "@src/types/domain.types";
import { monthsData } from "./months";
import { periodsData } from "./periods";

const domains: Record<string, IServerDomain[]> = {
  month: monthsData, 
  periods: periodsData, 
};

function getDomainById(domainId: string) {
  return domains[domainId];
}


export { getDomainById };
