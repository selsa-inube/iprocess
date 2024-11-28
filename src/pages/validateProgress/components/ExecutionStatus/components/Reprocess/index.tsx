import { useContext } from "react";
import { MdLaunch } from "react-icons/md";
import { Icon } from "@inubekit/icon";
import { useFlag } from "@inubekit/flag";

import { tokens } from "@design/tokens";
import { IPersonProcess } from "@components/feedback/CardStatusExecution/types";

import { AppContext } from "@context/AppContext";
import { ComponentAppearance } from "@ptypes/aparences.types";
import { IReprocessPersonsWithErrorsResponse } from "@pages/validateProgress/types";
import { reprocessPersonsWithErrors } from "@services/validateProgress/patchReprocessPeopleWithError";

interface IReprocessProps {
  data: IPersonProcess;
  setReprocessData: (
    data: IReprocessPersonsWithErrorsResponse | undefined
  ) => void;
}

const Reprocess = (props: IReprocessProps) => {
  const { data, setReprocessData } = props;

  const { appData } = useContext(AppContext);
  const { addFlag } = useFlag();

  const handleReprocess = async () => {
    const dataReprocess = {
      processControlId: data.processControlId || "",
      personPublicCode: data.personPublicCode,
    };

    try {
      const newReprocess = await reprocessPersonsWithErrors(
        appData.businessUnit.publicCode,
        dataReprocess
      );
      setReprocessData(newReprocess);
    } catch (error) {
      addFlag({
        title: "Error al reprocesar personas con errores",
        description:
          "No fue posible reprocesar personas con errores, por favor intenta más tarde",
        appearance: ComponentAppearance.DANGER,
        duration: 5000,
      });
      throw new Error(
        `Error al reprocesar personas con errores: ${(error as Error).message} `
      );
    }
  };
  return (
    <>
      <Icon
        appearance="dark"
        icon={<MdLaunch />}
        size={tokens.spacing.s200}
        onClick={handleReprocess}
        cursorHover
        spacing="narrow"
      />
    </>
  );
};

export { Reprocess };
