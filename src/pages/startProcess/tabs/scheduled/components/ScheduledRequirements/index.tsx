import { useEffect, useState } from "react";

import { generalStatusRequirement } from "@src/services/processRequirements/postGeneralStatusRequirement";
import {
  IGeneralStatusRequirementResponse,
  IProcessRequirementResponse,
} from "@src/types/statusRequeriments.types";
import { processRequirement } from "@src/services/processRequirements/postProcessRequirement";
import { formatDateEndpoint } from "@src/utils/dates";
import {
  normalizeStatusRequirementByStatus,
} from "@src/utils/requirements";
import { ScheduledRequirementsUI } from "./interface";

interface ScheduledRequirementsProps {
  id: string;
  month: number;
  plannedExecution?: Date;
  publicCode: string;
  year: number;
  prueba?: string;
  setStatus: (status: string) => void;
}

const ScheduledRequirements = (props: ScheduledRequirementsProps) => {
  const { id, month, plannedExecution, publicCode, year, setStatus } = props;
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
      const newStatusRequirements = await generalStatusRequirement(processData);
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
      typeExecution: "REFRESH",
      cutOffDate: new Date().toISOString(),
    };
    setLoadingRequirements(true);
    try {
      const newRequirements = await processRequirement(processData);
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
    <ScheduledRequirementsUI
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

export { ScheduledRequirements };
