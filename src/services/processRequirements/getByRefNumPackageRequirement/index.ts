import {
  enviroment,
  fetchTimeoutServices,
  maxRetriesServices,
} from "@config/environment";
import { IRefNumPackageRequirement } from "@ptypes/packageRequeriment.types";
import { mapListPeriodStartProcessApiToEntities } from "./mapper";

const refNumPackageRequirement = async (
  uniqueRefNumber: string
): Promise<IRefNumPackageRequirement[]> => {
  const maxRetries = maxRetriesServices;
  const fetchTimeout = fetchTimeoutServices;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const queryParams = new URLSearchParams({
        uniqueReferenceNumber: uniqueRefNumber,
      });

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), fetchTimeout);

      const options: RequestInit = {
        method: "GET",
        headers: {
          "X-Action": "SearchByReferenceNumberPakageRequirement",
          "X-Business-Unit": enviroment.TEMP_BUSINESS_UNIT,
          "Content-type": "application/json; charset=UTF-8",
        },
        signal: controller.signal,
      };

      const res = await fetch(
        `${enviroment.IPROCESS_API_URL_QUERY_IREQUER}/package-requirements-management?${queryParams.toString()}`,
        options
      );

      clearTimeout(timeoutId);

      if (res.status === 204) {
        return [];
      }

      const data = await res.json();

      if (!res.ok) {
        throw {
          message: "Error al obtener el requerimiento",
          status: res.status,
          data,
        };
      }

      const normalizedrefNumPackageRequirement = Array.isArray(data)
        ? mapListPeriodStartProcessApiToEntities(data)
        : [];

      return normalizedrefNumPackageRequirement;
    } catch (error) {
      if (attempt === maxRetries) {
        throw new Error(
          "Todos los intentos fallaron. No fue posible obtener el requerimiento."
        );
      }
    }
  }

  return [];
};

export { refNumPackageRequirement };
