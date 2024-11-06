import { useContext, useEffect, useState } from "react";

import { generalStatusRequirement } from "@services/processRequirements/postGeneralStatusRequirement";
import {
  IGeneralStatusRequirementResponse,
  IProcessRequirementResponse,
} from "@ptypes/statusRequeriments.types";
import { processRequirement } from "@services/processRequirements/postProcessRequirement";
import { formatDateEndpoint } from "@utils/dates";
import { AppContext } from "@context/AppContext";
import { normalizeStatusRequirementByStatus } from "@utils/requirements";
import { OnDemandRequirementsUI } from "./interface";

interface OnDemandRequirementsProps {
  id: string;
  month: number;
  plannedExecution?: Date;
  publicCode: string;
  year: number;
  prueba?: string;
  setStatus: (status: string) => void;
}

const OnDemandRequirements = (props: OnDemandRequirementsProps) => {
  const { id, month, plannedExecution, publicCode, year, setStatus } = props;
  const { appData } = useContext(AppContext);
  const [loadingStatusRequirements, setLoadingStatusRequirements] =
    useState<boolean>(false);
  const [loadingRequirements, setLoadingRequirements] =
    useState<boolean>(false);
  const [showModal, setShowModal] = useState(false);
  const [statusRequirementData, setStatusRequirementData] =
    useState<IGeneralStatusRequirementResponse>();
  const [processRequirementData, setProcessRequirementData] = useState<
    IProcessRequirementResponse[]
  >([]);

  const statusRequirementsData = async () => {
    const processData = {
      month,
      plannedExecution:
        plannedExecution?.toISOString() || new Date().toISOString(),
      publicCode,
      year,
    };
    setLoadingStatusRequirements(true);
    try {
      const newStatusRequirements = await generalStatusRequirement(
        appData.businessUnit.publicCode,
        processData
      );
      setStatusRequirementData(newStatusRequirements);
    } catch (error) {
      console.info(error);
    } finally {
      setLoadingStatusRequirements(false);
    }
  };

  const requirementsData = async () => {
    const processData = {
      month,
      executionDate: formatDateEndpoint(plannedExecution || new Date()),
      plannedExecution:
        plannedExecution?.toISOString() || new Date().toISOString(),
      publicCode,
      year,
      typeExecution: "",
      cutOffDate: new Date().toISOString(),
    };
    setLoadingRequirements(true);
    try {
      const newRequirements = await processRequirement(
        appData.businessUnit.publicCode,
        processData
      );
      setProcessRequirementData(newRequirements || []);
    } catch (error) {
      [];
    } finally {
      setLoadingRequirements(false);
    }
  };

  useEffect(() => {
    statusRequirementsData();
  }, []);

  useEffect(() => {
    requirementsData();
  }, []);

  const normalizeStatusRequirement = normalizeStatusRequirementByStatus(
    statusRequirementData?.generalStatus || ""
  );

  useEffect(() => {
    setStatus(normalizeStatusRequirement?.name || "");
  }, [normalizeStatusRequirement?.name, setStatus]);

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <OnDemandRequirementsUI
      id={id}
      isVisibleStatusReq={loadingStatusRequirements}
      isVisibleRequirements={loadingRequirements}
      statusRequirement={statusRequirementData}
      normalizeStatusRequirement={normalizeStatusRequirement}
      processRequirementData={processRequirementData!}
      showModal={showModal}
      handleToggleModal={handleToggleModal}
    />
  );
};

export { OnDemandRequirements };
