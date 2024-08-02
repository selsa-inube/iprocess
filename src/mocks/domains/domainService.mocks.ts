import { IServerDomain } from "@src/types/domain.types";
import { monthsData } from "./months";
import { typeRefreshData } from "./typeRefresh.mocks";

const domains: Record<string, IServerDomain[]> = {
  month: monthsData,
  typeRefresh: typeRefreshData,  
};

function getDomainById(domainId: string) {
  return domains[domainId];
}

export { getDomainById };
