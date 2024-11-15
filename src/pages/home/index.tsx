import { useContext, useState } from "react";

import { useOptionsByBusinessunits } from "@hooks/useOptionsByBusinessunits";
import { AppContext } from "@context/AppContext";
import { decrypt } from "@utils/encrypt";
import { HomeUI } from "./interface";

function Home() {
  const { businessUnitSigla } = useContext(AppContext);
  const [selectedClient, setSelectedClient] = useState<string>("");
  const portalId = localStorage.getItem("portalCode");
  const staffPortalId = portalId ? decrypt(portalId) : "";

  const { optionsCards, loading } = useOptionsByBusinessunits(
    staffPortalId,
    businessUnitSigla
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
