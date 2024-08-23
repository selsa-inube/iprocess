import { useEffect, useState } from "react";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { Icon } from "@inubekit/icon";

import { IActions, IBreakpoint } from "@components/data/Table/props";
import { tokens } from "@src/design/tokens";
import { DetailModal } from "@components/modals/DetailModal";
import { formatDateEndpoint } from "@src/utils/dates";
import { IProcessRequirementResponse } from "@src/types/statusRequeriments.types";
import { processRequirement } from "@src/services/processRequirements/postProcessRequirement";
import { IData } from "@components/modals/RequirementsModal/types";
import { labelsDetailsOnDemand } from "../../config/card.config";
import { dataTablesDetailsConfig } from "./config/tablesDetails.config";

interface IDetailsOnDemandProps {
  data: IActions;
  breakpoints: IBreakpoint[];
}

const DetailsOnDemand = (props: IDetailsOnDemandProps) => {
  const { data, breakpoints } = props;

  const [showModal, setShowModal] = useState(false);

  const [loadingRequirements, setLoadingRequirements] =
    useState<boolean>(false);
  const [processRequirementData, setProcessRequirementData] = useState<
    IProcessRequirementResponse[]
  >([]);

  const dataFormatted = formatDateEndpoint(new Date(data.date as Date));
  const requirementsData = async () => {
    const processData = {
      month: Number(data.month),
      executionDate: dataFormatted,
      plannedExecution: new Date(data.date as Date).toISOString(),
      publicCode: String(data.publicCode),
      year: Number(data.year),
      typeExecution: "",
      cutOffDate: new Date().toISOString(),
    };

    setLoadingRequirements(true);
    try {
      const newRequirements = await processRequirement(processData);
      setProcessRequirementData(newRequirements || []);
    } catch (error) {
      throw new Error(
        `Error al obtener los datos: ${(error as Error).message} `
      );
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
          data={data}
          labels={labelsDetailsOnDemand}
          requirement={
            dataTablesDetailsConfig(processRequirementData) as IData[]
          }
          breakpoints={breakpoints}
          isVisible={loadingRequirements}
          onCloseModal={handleToggleModal}
        />
      )}
    </>
  );
};

export { DetailsOnDemand };
