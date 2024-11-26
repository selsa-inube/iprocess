import { IServerDomain } from "@ptypes/domain.types";
import { monthsData } from "./months";
import { periodsData } from "./periods";
import { typeRefreshData } from "./typeRefresh";

const domains: Record<string, IServerDomain[]> = {
  month: monthsData, 
  periods: periodsData,
  typeRefresh: typeRefreshData,  
};

function getDomainById(domainId: string) {
  return domains[domainId];
}


export { getDomainById };
