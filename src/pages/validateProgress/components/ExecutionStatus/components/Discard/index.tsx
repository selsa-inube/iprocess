import { useContext } from "react";
import { MdOutlineDelete } from "react-icons/md";
import { Icon } from "@inubekit/icon";
import { useFlag } from "@inubekit/flag";

import { tokens } from "@design/tokens";
import { IPersonProcess } from "@components/feedback/CardStatusExecution/types";
import { AppContext } from "@context/AppContext";
import { ComponentAppearance } from "@ptypes/aparences.types";
import { IDiscardPersonsWithErrorsResponse } from "@pages/validateProgress/types";
import { discardPersonsWithErrors } from "@services/validateProgress/patchDiscardPeopleWithError";

interface IDiscardProps {
  data: IPersonProcess;
  setDiscardData: (data: IDiscardPersonsWithErrorsResponse | undefined) => void;
}

const Discard = (props: IDiscardProps) => {
  const { data, setDiscardData } = props;

  const { appData } = useContext(AppContext);
  const { addFlag } = useFlag();

  const handleDiscard = async (
  ) => {
    const dataDiscard = {
      processControlId: data.processControlId || "",
      processPersonId: data.processPersonId,
    };

    try {
      const newDiscard = await discardPersonsWithErrors(
        appData.businessUnit.publicCode,
        dataDiscard
      );
      setDiscardData(newDiscard);
    } catch (error) {
      addFlag({
        title: "Error al descartar personas con errores",
        description:
          "No fue posible descartar personas con errores, por favor intenta más tarde",
        appearance: ComponentAppearance.DANGER,
        duration: 5000,
      });
      throw new Error(
        `Error al descartar personas con errores: ${(error as Error).message} `
      );
    } 
  };
  
  return (
    <>
      <Icon
        appearance="dark"
        icon={<MdOutlineDelete />}
        size={tokens.spacing.s200}
        onClick={handleDiscard}
        cursorHover
        spacing="narrow"
      />
    </>
  );
};

export { Discard };
