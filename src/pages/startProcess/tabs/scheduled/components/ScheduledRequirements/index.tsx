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
import { ScheduledRequirementsUI } from "./interface";

interface ScheduledRequirementsProps {
  id: string;
  month: number;
  publicCode: string;
  status: string;
  year: number;
  setStatus: (status: string) => void;
  plannedExecution?: Date;
  withTooltip?: boolean;
  isCard?: boolean;
}

const ScheduledRequirements = (props: ScheduledRequirementsProps) => {
  const {
    id,
    isCard = true,
    month,
    plannedExecution,
    publicCode,
    year,
    status,
    withTooltip = true,
    setStatus,
  } = props;
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
      const newStatusRequirements = await generalStatusRequirement(appData.businessUnit.publicCode, processData);
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
    requirementsData();
  }, []);

  const normalizeStatusRequirement = normalizeStatusRequirementByStatus(
    // statusRequirementData?.generalStatus || ""
    "NotMeets"
  );

  useEffect(() => {
    setStatus(normalizeStatusRequirement?.name || "");
    status;
  }, [normalizeStatusRequirement?.name, setStatus, status]);

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <ScheduledRequirementsUI
      id={id}
      isCard={isCard}
      isVisibleStatusReq={loadingStatusRequirements}
      isVisibleRequirements={loadingRequirements}
      statusRequirement={statusRequirementData}
      normalizeStatusRequirement={normalizeStatusRequirement}
      processRequirementData={processRequirementData!}
      showModal={showModal}
      handleToggleModal={handleToggleModal}
      withTooltip={withTooltip}
    />
  );
};

export { ScheduledRequirements };
