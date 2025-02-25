import { useContext, useEffect, useState } from "react";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { Icon } from "@inubekit/inubekit";

import { DetailModal } from "@components/modals/DetailModal";
import { tokens } from "@design/tokens";
import { IEntries } from "@forms/types";
import { IBreakpoint } from "@components/data/Table/props";
import { processRequirement } from "@services/processRequirements/postProcessRequirement";
import { IProcessRequirementResponse } from "@ptypes/statusRequeriments.types";
import { IData } from "@components/modals/requirementsModal/types";
import { labelsDetails } from "@pages/startProcess/tabs/scheduled/config/card.config";
import { formatDateEndpoint } from "@utils/dates";
import { AppContext } from "@context/AppContext";
import { dataTablesDetailsDailyConfig} from "./config/tablesDetailsDaily.config";


interface IDetailsProcessDailyProps {
  data: IEntries;
  breakpoints: IBreakpoint[];
  nameAplication: string;
}

const DetailsProcessDaily = (props: IDetailsProcessDailyProps) => {
  const {
    data,
    breakpoints,
    nameAplication
  } = props;

  const { appData } = useContext(AppContext);
  const [showModal, setShowModal] = useState(false);
  const [loadingRequirements, setLoadingRequirements] = useState<boolean>(false);
  const [processRequirementData, setProcessRequirementData] = useState<IProcessRequirementResponse[]>([]);
  
  const dataFormatted = formatDateEndpoint(new Date(data.date as Date));
  const requirementsData = async () => {
    const processData = {
      month: Number(data.month),
      executionDate: dataFormatted,
      plannedExecution:new Date(data.date as Date).toISOString(),
      publicCode: String(data.publicCode),
      year: Number(data.year),
      typeExecution: "",
      cutOffDate:new Date().toISOString(),
    };
    
    setLoadingRequirements(true);
    try {
      const newRequirements = await processRequirement(appData.businessUnit.publicCode, processData);
      setProcessRequirementData(newRequirements || []); 
    } catch (error) {
      throw new Error(`Error al obtener los datos: ${(error as Error).message} `);
    } finally {
      setLoadingRequirements(false);
    }
  };
  
  useEffect(() => {
    requirementsData();
  }, []);
  
  
  const handleToggleModal = () => {
    setShowModal(!showModal);
  };
  
  const totalData = {...data, aplication: nameAplication};

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
      {showModal && data && (
        <DetailModal
          portalId="portal"
          title="Detalle"
          data={totalData}
          labels={labelsDetails}
          requirement={dataTablesDetailsDailyConfig(processRequirementData) as IData[]}
          breakpoints={breakpoints}
          isVisible={loadingRequirements}
          onCloseModal={handleToggleModal}
        />
      )}
    </>
  );
};

export { DetailsProcessDaily };
