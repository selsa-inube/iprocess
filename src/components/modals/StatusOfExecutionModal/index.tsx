import { useState } from "react";

import { StartProcesses } from "@pages/startProcess/types";
import { StatusOfExecutionModalUI } from "./interface";
import { ILabel } from "./types";

interface StatusOfExecutionModalProps {
  dataInformationProcess: StartProcesses;
  labels: ILabel[];
  portalId: string;
  processControlId: string;
  onCloseModal: () => void;
}

const StatusOfExecutionModal = (props: StatusOfExecutionModalProps) => {
  const {
    processControlId,
    portalId,
    dataInformationProcess,
    labels,
    onCloseModal,
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
      processControlId={processControlId}
      labels={labels}
      portalId={portalId}
      search={search}
      seeErrorsChecked={seeErrorsChecked}
      onChangeSearch={handleSearch}
      onChangeToggle={handleChangeToggle}
      onCloseModal={onCloseModal}
    />
  );
};

export { StatusOfExecutionModal };
export type { StatusOfExecutionModalProps };
