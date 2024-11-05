import {
  enviroment,
  fetchTimeoutServices,
  maxRetriesServices,
} from "@config/environment";
import { IRefNumPackageRequirement } from "@ptypes/packageRequeriment.types";
import { mapRefNumPackRequirementApiToEntity } from "./mapper";

const refNumPackageRequirement = async (
  businessUnitPublicCode: string,
  uniqueRefNumber: string
): Promise<IRefNumPackageRequirement> => {
  const maxRetries = maxRetriesServices;
  const fetchTimeout = fetchTimeoutServices;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), fetchTimeout);

      const options: RequestInit = {
        method: "GET",
        headers: {
          "X-Action": "SearchByIdPakageRequirementWhitGeneralStatus",
          "X-Business-Unit": businessUnitPublicCode,
          "Content-type": "application/json; charset=UTF-8",
        },
        signal: controller.signal,
      };

      const res = await fetch(
        `${enviroment.IREQUER_API_URL_QUERY}/package-requirements-management/${uniqueRefNumber}`,
        options
      );

      clearTimeout(timeoutId);

      if (res.status === 204) {
        return {} as IRefNumPackageRequirement;
      }

      const data = await res.json();

      if (!res.ok) {
        throw {
          message: "Error al obtener el requerimiento",
          status: res.status,
          data,
        };
      }

   
      return mapRefNumPackRequirementApiToEntity(data);
    } catch (error) {
      if (attempt === maxRetries) {
        throw new Error(
          "Todos los intentos fallaron. No fue posible obtener el requerimiento."
        );
      }
    }
  }

  return {} as IRefNumPackageRequirement;
};

export { refNumPackageRequirement };
