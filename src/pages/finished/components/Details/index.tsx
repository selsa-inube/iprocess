import { MdOutlineRemoveRedEye } from "react-icons/md";
import { useEffect, useState } from "react";
import { Icon } from "@inubekit/icon";

import { IEntries } from "@forms/types";
import { tokens } from "@design/tokens";
import { refNumPackageRequirement } from "@services/processRequirements/getByRefNumPackageRequirement";
import { IRefNumPackageRequirement } from "@ptypes/packageRequeriment.types";
import { IData } from "@components/modals/requirementsModal/types";
import { ExecutionParametersModal } from "@components/modals/ExecutionParametersModal";
import { labelsDetails } from "../../config/card.config";
import {  breakPointsParameters, dataTablesDetailsConfig,  titlesParameters } from "./config/parameters.config";

interface DetailsProps {
  data: IEntries;
}

const Details = (props: DetailsProps) => {
  const { data } = props;
  const [showModal, setShowModal] = useState(false);
  const [processRequirementData, setProcessRequirementData] = useState<IRefNumPackageRequirement>();

  const executionParameters = data.executionParameters
  ? Object.entries(data.executionParameters).map(([key, value], index) => ({
    id: (index + 1).toString(),
    parameter: key,
    value: value
  }))
  : [];

  const requirementsData = async () => {  
    try {
      const newRequirement = await refNumPackageRequirement(String(data?.referenceNumberRequirement));
      setProcessRequirementData(newRequirement); 
    } catch (error) {
      throw new Error(`Error al obtener los datos: ${(error as Error).message} `);
    }
  };

  useEffect(() => {
    if(showModal)requirementsData();
  }, [showModal]);

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
         <ExecutionParametersModal
         isVisible={false}
         portalId="portal"
         data={data}
         labels={labelsDetails}
         titlesParametersTable={titlesParameters}
         entriesParametersTable={executionParameters}
         breakPointsParametersTable={breakPointsParameters}
         breakpointsRequirement={breakPointsParameters}
         requirement={dataTablesDetailsConfig(processRequirementData?.listOfRequirements || []) as IData[]}
         onCloseModal={handleToggleModal}
         />
      )}
    </>
  );
};

export { Details };
