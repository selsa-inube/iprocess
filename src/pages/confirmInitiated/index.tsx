import { useEffect, useState } from "react";

import { confirmInitiatedData } from "@services/confirmInitiated/getConfirmInitiated";
import { IConfirmInitiated } from "./types";
import { ConfirmInitiatedUI } from "./interface";
import { orderDateConfirmInitialted } from "./utils";


function ConfirmInitiated() {
  const [searchConfirmInitiated, setSearchConfirmInitiated] =
    useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [orderAscending, setOrderAscending] = useState<boolean>(false);
  const [confirmInitiated, setConfirmInitiated] = useState<IConfirmInitiated[]>(
    []
  );

  const handleOrderData = () => {
    setOrderAscending(!orderAscending);
    orderDateConfirmInitialted(confirmInitiated, orderAscending);
    setConfirmInitiated(confirmInitiated);
  };

  const validateConfirmInitiated = async () => {
    setLoading(true);
    try {
      const newConfirmInitiated = await confirmInitiatedData();

      setConfirmInitiated(newConfirmInitiated);
    } catch (error) {
      console.info(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    validateConfirmInitiated();
  }, []);

  const handleSearchConfirmInitiated = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchConfirmInitiated(e.target.value);
  };

  return (
    <ConfirmInitiatedUI
      entries={confirmInitiated}
      isVisible={loading}
      searchConfirmInitiated={searchConfirmInitiated}
      onSearchConfirmInitiated={handleSearchConfirmInitiated}
      onOrderData={handleOrderData}
    />
  );
}

export { ConfirmInitiated };
