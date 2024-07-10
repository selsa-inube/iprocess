import { IServerDomain } from "@src/types/domain.types";
import { monthsData } from "./months";

const domains: Record<string, IServerDomain[]> = {
  month: monthsData,  
};

function getDomainById(domainId: string) {
  return domains[domainId];
}


export { getDomainById };
