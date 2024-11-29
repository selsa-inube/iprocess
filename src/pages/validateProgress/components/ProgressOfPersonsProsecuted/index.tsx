import { useContext, useEffect, useState } from "react";
import { ProgressBar } from "@inubekit/progressbar";

import { tokens } from "@design/tokens";
import { personProcess } from "@services/validateProgress/getEstimatedTimeToProcess";
import { AppContext } from "@context/AppContext";
import { ComponentAppearance } from "@ptypes/aparences.types";
import { StyledContainerProgressBar } from "./styles";

interface ProgressOfPersonsProsecutedProps {
  id: string;
}

const calculatePercentage = (
  totalPersons: number,
  totalProcessedPersons: number
) => {
  return (totalProcessedPersons * 100) / totalPersons;
};

const ProgressOfPersonsProsecuted = (
  props: ProgressOfPersonsProsecutedProps
) => {
  const { id } = props;
  const { appData } = useContext(AppContext);
  const [totalPersons, setTotalPersons] = useState<number>(0);
  const [totalProcessedPersons, setTotalProcessedPersons] = useState<number>(0);
  const [percentage, setPercentage] = useState(0);

  const estimatedTimeProcessData = async () => {
    try {
      const newEstimatedTimeProcess = await personProcess(
        appData.businessUnit.publicCode,
        id
      );
      setTotalProcessedPersons(newEstimatedTimeProcess.totalProcessedPersons);
      setTotalPersons(newEstimatedTimeProcess.totalPersons);
    } catch (error) {
      throw new Error(
        `Error al obtener los datos: ${(error as Error).message} `
      );
    }
  };

  useEffect(() => {
    estimatedTimeProcessData();
    const interval = setInterval(() => {
      const newPercentage = calculatePercentage(
        totalPersons,
        totalProcessedPersons
      );

      if (newPercentage >= 100) {
        clearInterval(interval);
        setPercentage(100);
      } else {
        estimatedTimeProcessData();
        setPercentage(newPercentage);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [totalProcessedPersons, totalPersons]);

  return (
    <>
      <StyledContainerProgressBar $height={tokens.spacing.s200}>
        <ProgressBar
          progress={percentage}
          height={tokens.spacing.s200}
          animated={percentage === 100 ? false : true}
          appearance={ComponentAppearance.PRIMARY}
        />
      </StyledContainerProgressBar>
    </>
  );
};

export { ProgressOfPersonsProsecuted };
