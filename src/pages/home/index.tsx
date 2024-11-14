import { useContext, useState } from "react";

import { useOptionsByBusinessunits } from "@hooks/useOptionsByBusinessunits";
import { AppContext } from "@context/AppContext";
import { decrypt } from "@utils/encrypt";
import { HomeUI } from "./interface";

function Home() {
  const { appData } = useContext(AppContext);
  const [selectedClient, setSelectedClient] = useState<string>("");
  const portalId = localStorage.getItem("portalCode");
  const staffPortalId = portalId ? decrypt(portalId) : "";

  const { optionsCards, loading } = useOptionsByBusinessunits(
    staffPortalId,
    appData.businessUnit.publicCode
  );

  return (
    <HomeUI
      data={optionsCards || []}
      isLoading={loading}
      selectedClient={selectedClient}
      setSelectedClient={setSelectedClient}
    />
  );
}

export { Home };
