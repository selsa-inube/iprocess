import { useEffect, useState } from "react";
import { normalizeStatusRequirementByStatus } from "@utils/requirements";
import { IRefNumPackageRequirement } from "@ptypes/packageRequeriment.types.ts";
import { refNumPackageRequirement } from "@services/processRequirements/getByRefNumPackageRequirement/index.ts";
import { RequirementsUI } from "./interface.tsx";

interface RequirementsProps {
  uniqueReferenceNumber: string;
  status: string;
  setStatus: (status: string) => void;
  withTooltip?: boolean;
}

const Requirements = (props: RequirementsProps) => {
  const {
    uniqueReferenceNumber,
    status,
    withTooltip = true,
    setStatus,
  } = props;
 
  const [loading, setLoading] =
    useState<boolean>(false);
  const [showModal, setShowModal] = useState(false);
  const [statusRequirementData, setStatusRequirementData] =
    useState<IRefNumPackageRequirement>();

  const generalStatusRequirement = async () => {
    setLoading(true);
    try {
      const newStatusRequirement = await refNumPackageRequirement(uniqueReferenceNumber);
      const statusRequirementData = newStatusRequirement.find((item) => item.id);

      setStatusRequirementData(statusRequirementData);
    } catch (error) {
      console.info(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    generalStatusRequirement();
  }, []);

  const normalizeStatusRequirement = normalizeStatusRequirementByStatus(
    statusRequirementData?.generalStatusRequirement || ""
  );

  useEffect(() => {
    setStatus(normalizeStatusRequirement?.name || "");
    status;
  }, [normalizeStatusRequirement?.name, setStatus, status]);

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <RequirementsUI
      handleToggleModal={handleToggleModal}
      isVisibleStatusReq={loading}
      normalizeStatusRequirement={normalizeStatusRequirement}
      showModal={showModal}
      statusRequirement={statusRequirementData}
      withTooltip={withTooltip}
    />
  );
};

export { Requirements };
