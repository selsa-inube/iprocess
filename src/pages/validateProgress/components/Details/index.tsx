import { MdOutlineRemoveRedEye } from "react-icons/md";
import { useEffect, useState } from "react";
import { Icon } from "@inubekit/icon";

import { IEntries } from "@forms/types";
import { tokens } from "@design/tokens";
import { refNumPackageRequirement } from "@services/processRequirements/getByRefNumPackageRequirement";
import { IRefNumPackageRequirement } from "@ptypes/packageRequeriment.types";
import { DetailModal } from "@components/modals/DetailModal";
import { IData } from "@components/modals/requirementsModal/types";
import { normalizeStatusRequirementByStatus } from "@utils/requirements";
import { labelsDetails } from "../../config/card.config";
import { breakPoints, dataTablesDetailsConfig } from "./config/tablesDetails.config";

interface DetailsProps {
  data: IEntries;
}

const Details = (props: DetailsProps) => {
  const { data } = props;
  const [showModal, setShowModal] = useState(false);
  const [loadingRequirements, setLoadingRequirements] = useState<boolean>(false);
  const [processRequirementData, setProcessRequirementData] = useState<IRefNumPackageRequirement>();

  const requirementsData = async () => {  

    setLoadingRequirements(true);
    try {
      const newRequirement = await refNumPackageRequirement(String(data?.referenceNumberRequirement));
      setProcessRequirementData(newRequirement); 
    } catch (error) {
      throw new Error(`Error al obtener los datos: ${(error as Error).message} `);
    } finally {
      setLoadingRequirements(false);
    }
  };

  useEffect(() => {
    if(showModal)requirementsData();
  }, [showModal]);

  useEffect(() => {
    if (processRequirementData) {
      data.status = normalizeStatusRequirementByStatus(processRequirementData?.generalStatusRequirement||"")?.name;
    }
  }, [processRequirementData?.listOfRequirements]);
    
  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <Icon
        appearance="dark"
        icon={<MdOutlineRemoveRedEye />}
        size={tokens.spacing.s200}
        onClick={handleToggleModal}
        cursorHover
        spacing="narrow"
        />
      {showModal && (
          <DetailModal
          portalId="portal"
          title="Detalle"
          data={data}
          labels={labelsDetails}
          onCloseModal={handleToggleModal}
          requirement={dataTablesDetailsConfig(processRequirementData?.listOfRequirements || []) as IData[]}
          breakpoints={breakPoints}
          isVisible={loadingRequirements}
        />
      )}
    </>
  );
};

export { Details };
