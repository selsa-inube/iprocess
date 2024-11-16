import { createContext, useEffect, useMemo, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import { decrypt } from "@utils/encrypt";
import { usePortalData } from "@hooks/usePortalData";
import { useBusinessManagers } from "@hooks/useBusinessManagers";
import { IBusinessUnitsPortalStaff } from "@ptypes/staffPortalBusiness.types";
import { IAppContext, IAppData } from "./types";

const AppContext = createContext<IAppContext>({} as IAppContext);

interface AppProviderProps {
  children: React.ReactNode;
}

function AppContextProvider(props: AppProviderProps) {
  const { children } = props;
  const { user } = useAuth0();

  const { portalData } = usePortalData();

  const [businessUnitSigla, setBusinessUnitSigla] = useState(
    localStorage.getItem("businessUnitSigla") || ""
  );

  const [businessUnitsToTheStaff, setBusinessUnitsToTheStaff] = useState<IBusinessUnitsPortalStaff[]>(() => {
    const savedBusinessUnits = localStorage.getItem("businessUnitsToTheStaff");
    return savedBusinessUnits ? JSON.parse(savedBusinessUnits) : [];
  });

  const portalId = localStorage.getItem("portalCode");
  let portalCode = "";
  if (portalId) {
    portalCode = decrypt(portalId || "");
  }

  const { businessManagersData } = useBusinessManagers(portalData, portalCode);

  let businessUnitData: IBusinessUnitsPortalStaff | null = null;
  try {
    businessUnitData = JSON.parse(businessUnitSigla || "{}") as IBusinessUnitsPortalStaff;
  } catch (error) {
    console.error("Error parsing businessUnitSigla:", error);
  }

  const [appData, setAppData] = useState<IAppData>({
    portal: {
      abbreviatedName: "",
      staffPortalCatalogId: "",
      businessManagerId: "",
      publicCode: "",
    },
    businessManager: {
      publicCode: "",
      abbreviatedName: "",
      urlBrand: "",
      urlLogo: "",
    },
    businessUnit: {
      publicCode: businessUnitData?.publicCode || "",
      abbreviatedName: businessUnitData?.abbreviatedName || "",
      languageId: businessUnitData?.languageId || "",
      urlLogo: businessUnitData?.urlLogo || "",
    },
    user: {
      userAccount: user?.email || "",
      userName: user?.name || "",
    },
  });

  useEffect(() => {
    if (!businessManagersData) return;

    const portalDataFiltered = portalData.find(
      (data) => data.staffPortalId === portalCode
    );

    setAppData((prev) => ({
      ...prev,
      portal: {
        ...prev.portal,
        abbreviatedName: portalDataFiltered?.abbreviatedName || "",
        staffPortalCatalogId: portalDataFiltered?.staffPortalId || "",
        businessManagerId: portalDataFiltered?.businessManagerId || "",
        publicCode: portalDataFiltered?.publicCode || "",
      },
      businessManager: {
        ...prev.businessManager,
        publicCode: businessManagersData.publicCode || "",
        abbreviatedName: businessManagersData.abbreviatedName || "",
        urlBrand: businessManagersData.urlBrand || "",
        urlLogo: businessManagersData.urlLogo || "",
      },
    }));
  }, [businessManagersData, portalData, portalCode]);

  useEffect(() => {
    localStorage.setItem("businessUnitSigla", businessUnitSigla);

    if (businessUnitsToTheStaff && businessUnitSigla) {
      const businessUnit = JSON.parse(businessUnitSigla);

      setAppData((prev) => ({
        ...prev,
        businessUnit: {
          ...prev.businessUnit,
          abbreviatedName: businessUnit?.abbreviatedName,
          publicCode: businessUnit?.publicCode,
          languageId: businessUnit?.languageId,
          urlLogo: businessUnit?.urlLogo,
        },
      }));
    }
  }, [businessUnitSigla, businessUnitsToTheStaff]);

  useEffect(() => {
    localStorage.setItem("businessUnitsToTheStaff", JSON.stringify(businessUnitsToTheStaff));
  }, [businessUnitsToTheStaff]);

  const appContext = useMemo(
    () => ({
      appData,
      businessUnitSigla,
      businessUnitsToTheStaff,
      setAppData,
      setBusinessUnitSigla,
      setBusinessUnitsToTheStaff,
    }),
    [appData, businessUnitSigla, businessUnitsToTheStaff]
  );

  return (
    <AppContext.Provider value={appContext}>{children}</AppContext.Provider>
  );
}

export { AppContext, AppContextProvider };
export type { AppProviderProps };