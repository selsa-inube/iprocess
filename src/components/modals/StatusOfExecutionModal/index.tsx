import { useEffect, useState } from "react";

import { StartProcesses } from "@pages/startProcess/types";
import { IPersonProcess } from "@components/feedback/CardStatusExecution/types";
import { IProcessPersonsWithErrors } from "@pages/validateProgress/types";
import { StatusOfExecutionModalUI } from "./interface";
import { ILabel } from "./types";

interface StatusOfExecutionModalProps {
  attributes: string[];
  dataInformationProcess: StartProcesses;
  dataPerson: IPersonProcess[];
  isLoading: boolean;
  labels: ILabel[];
  portalId: string;
  loadingDiscard: boolean;
  onCloseModal: () => void;
  onDiscard: (data: IProcessPersonsWithErrors[]) => void;
  onReprocess: () => void;
}

const StatusOfExecutionModal = (props: StatusOfExecutionModalProps) => {
  const {
    attributes,
    portalId,
    dataInformationProcess,
    isLoading,
    dataPerson,
    labels,
    loadingDiscard,
    onCloseModal,
    onReprocess,
    onDiscard,
  } = props;
  const [seeErrorsChecked, setSeeErrorsChecked] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [dataSubtmit, setDataSubtmit] = useState<IProcessPersonsWithErrors[]>();
  const [disabledBoton, setDisabledBoton] = useState<boolean>(true);

  const handleChangeToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSeeErrorsChecked(e.target.checked);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleProcessPersonId = (id: string | undefined, check: boolean) => {
    if (check) {
      setDisabledBoton(false);
      setDataSubtmit((prev) => {
        return [
          ...(prev || []),
          {
            processPersonId: id || "",
          },
        ];
      });
    } else {
      setDataSubtmit((prev) => {
        return prev?.filter((item) => item.processPersonId !== id);
      });
    }
  };

  useEffect(() => {
    if (dataSubtmit && dataSubtmit.length === 0) {
      setDisabledBoton(true);
    }
  }, [dataSubtmit]);

  return (
    <StatusOfExecutionModalUI
      attributes={attributes}
      dataInformationProcess={dataInformationProcess}
      dataPerson={dataPerson}
      dataSubtmit={dataSubtmit}
      disabledBoton={disabledBoton}
      isLoading={isLoading}
      labels={labels}
      portalId={portalId}
      search={search}
      seeErrorsChecked={seeErrorsChecked}
      loadingDiscard={loadingDiscard}
      onChangeSearch={handleSearch}
      onChangeToggle={handleChangeToggle}
      onCloseModal={onCloseModal}
      onDiscard={onDiscard}
      onProcessPersonId={handleProcessPersonId}
      onReprocess={onReprocess}
    />
  );
};

export { StatusOfExecutionModal };
export type { StatusOfExecutionModalProps };
