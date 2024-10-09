import { useEffect, useState } from "react";
import { confirmInitiatedData } from "@services/confirmInitiated/getConfirmInitiated";
import { ConfirmInitiatedUI } from "./interface";
import { StartProcesses } from "../startProcess/types";

function ConfirmInitiated() {
  const [searchConfirmInitiated, setSearchConfirmInitiated] =
    useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [status, setStatus] = useState<string>("");
  const [deleteProcess, setDeleteProcess] = useState<string>("");
  const [confirmInitiated, setConfirmInitiated] = useState<StartProcesses[]>(
    []
  );

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

  useEffect(() => {
    if (deleteProcess) {
      setConfirmInitiated((prev) =>
        prev.filter((entry) => entry.id !== deleteProcess)
      );
    }
  }, [deleteProcess]);

  const handleSearchConfirmInitiated = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchConfirmInitiated(e.target.value);
  };

  return (
    <ConfirmInitiatedUI
      entries={confirmInitiated}
      isLoading={loading}
      status={status}
      setStatus={setStatus}
      setDeleteProcess={setDeleteProcess}
      handleSearchConfirmInitiated={handleSearchConfirmInitiated}
      searchConfirmInitiated={searchConfirmInitiated}
    />
  );
}

export { ConfirmInitiated };
