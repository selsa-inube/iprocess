import { useState, useEffect } from "react";

import { IOptionsByBusinessUnits } from "@ptypes/staffPortalBusiness.types";
import { optionsByBusinessUnits } from "@services/staffPortal/getOptionsByBusinessUnits";
import { normalizeOptionsByPublicCode } from "@utils/optionsByBusinessUnits";

export const useOptionsByBusinessunits = (
  staffPortalId: string,
  businessUnitSigla: string
) => {
  const [optionsData, setOptionsData] = useState<IOptionsByBusinessUnits[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchOptionsByBusinessUnits = async () => {
      setLoading(true);
      try {
        const businessUnit = JSON.parse(businessUnitSigla || "{}");
        const newOptions = await optionsByBusinessUnits(
          staffPortalId,
          businessUnit.publicCode
        );
        setOptionsData(newOptions);
      } catch (error) {
        console.info(error);
        setHasError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchOptionsByBusinessUnits();
  }, [businessUnitSigla]);

  const optionsCards = optionsData
    .filter((option) => normalizeOptionsByPublicCode(option.publicCode))
    .map((option) => {
      const normalizedOption = normalizeOptionsByPublicCode(option.publicCode);
      return {
        id: option.publicCode,
        label: option.abbreviatedName,
        description: option.descriptionUse,
        icon: normalizedOption?.icon || "",
        url: normalizedOption?.url || "",
      };
    });

  return { optionsCards, hasError, loading };
};
