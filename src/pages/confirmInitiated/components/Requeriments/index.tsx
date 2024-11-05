import { useContext, useEffect, useState } from "react";
import { normalizeStatusRequirementByStatus } from "@utils/requirements";
import { IRefNumPackageRequirement } from "@ptypes/packageRequeriment.types.ts";
import { refNumPackageRequirement } from "@services/processRequirements/getByRefNumPackageRequirement/index.ts";
import { AppContext } from "@context/AppContext/index.tsx";
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

  const { appData } = useContext(AppContext);
  const [loading, setLoading] =
    useState<boolean>(false);
  const [showModal, setShowModal] = useState(false);
  const [statusRequirementData, setStatusRequirementData] =
    useState<IRefNumPackageRequirement>();

    const [loadDataTable, setLoadDataTable] = useState(false);

  const generalStatusRequirement = async () => {
    setLoading(true);
    try {
      const newStatusRequirement = await refNumPackageRequirement(appData.businessUnit.publicCode, uniqueReferenceNumber);
      setStatusRequirementData(newStatusRequirement);
    } catch (error) {
      console.info(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if(uniqueReferenceNumber) generalStatusRequirement();
  }, []);

  useEffect(() => {
    if (loadDataTable) {
      generalStatusRequirement();
      setLoadDataTable(false);
    }
  }, [loadDataTable]);

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
      setLoadDataTable={setLoadDataTable}
      withTooltip={withTooltip}
    />
  );
};

export { Requirements };
