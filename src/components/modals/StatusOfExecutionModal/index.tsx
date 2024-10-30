import { useState } from "react";

import { StartProcesses } from "@pages/startProcess/types";
import { IPersonProcess } from "@components/feedback/CardStatusExecution/types";
import { StatusOfExecutionModalUI } from "./interface";
import { ILabel } from "./types";

interface StatusOfExecutionModalProps {
  attributes: string[];
  dataInformationProcess: StartProcesses;
  dataPerson: IPersonProcess[];
  isLoading: boolean;
  labels: ILabel[];
  portalId: string;
  onCloseModal: () => void;
  onReprocess: () => void;
  onDiscard: () => void;
}

const StatusOfExecutionModal = (props: StatusOfExecutionModalProps) => {
  const {
    attributes,
    portalId,
    dataInformationProcess,
    isLoading,
    dataPerson,
    labels,
    onCloseModal,
    onReprocess,
    onDiscard,
  } = props;
  const [seeErrorsChecked, setSeeErrorsChecked] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");

  const handleChangeToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSeeErrorsChecked(e.target.checked);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <StatusOfExecutionModalUI
      dataInformationProcess={dataInformationProcess}
      dataPerson={dataPerson}
      isLoading={isLoading}
      labels={labels}
      portalId={portalId}
      search={search}
      seeErrorsChecked={seeErrorsChecked}
      attributes={attributes}
      onChangeSearch={handleSearch}
      onChangeToggle={handleChangeToggle}
      onCloseModal={onCloseModal}
      onReprocess={onReprocess}
      onDiscard={onDiscard}
    />
  );
};

export { StatusOfExecutionModal };
export type { StatusOfExecutionModalProps };
