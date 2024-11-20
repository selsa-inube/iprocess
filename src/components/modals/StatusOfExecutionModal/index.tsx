import { useEffect, useState } from "react";

import { StartProcesses } from "@pages/startProcess/types";
import { IListOfPeopleToReprocess, IProcessPersonsWithErrors } from "@pages/validateProgress/types";
import { StatusOfExecutionModalUI } from "./interface";
import { ILabel } from "./types";

interface StatusOfExecutionModalProps {
  dataInformationProcess: StartProcesses;
  isdiscardPersonsWithErrors: boolean;
  isReprocessPersonsWithErrors: boolean;
  labels: ILabel[];
  loadingDiscard: boolean;
  loadingReprocess: boolean;
  portalId: string;
  processControlId: string;
  onCloseModal: () => void;
  onDiscard: (data: IProcessPersonsWithErrors[]) => void;
  onReprocess: (data: IListOfPeopleToReprocess[]) => void;
}

const StatusOfExecutionModal = (props: StatusOfExecutionModalProps) => {
  const {
    isdiscardPersonsWithErrors,
    isReprocessPersonsWithErrors,
    processControlId,
    portalId,
    dataInformationProcess,
    labels,
    loadingDiscard,
    loadingReprocess,
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

  const handleProcessPersonId = (id: string | undefined, publicCode: string | undefined, check: boolean) => {
    if (check) {
      setDisabledBoton(false);
      setDataSubtmit((prev) => {
        return [
          ...(prev || []),
          {
            processPersonId: id || "",
            personPublicCode: publicCode || "",
          },
        ];
      });


    } else {
      setDataSubtmit((prev) => {
        return prev?.filter((item) => item.processPersonId !== id );
      });
    }
  };

  useEffect(() => {
    if (dataSubtmit && dataSubtmit.length === 0) {
      setDisabledBoton(true);
    }
  }, [dataSubtmit]);

  useEffect(() => { 
    if (!seeErrorsChecked) {
      setDataSubtmit([]);
    }
  } , [seeErrorsChecked]);

  return (
    <StatusOfExecutionModalUI
      dataInformationProcess={dataInformationProcess}
      processControlId={processControlId}
      labels={labels}
      portalId={portalId}
      search={search}
      seeErrorsChecked={seeErrorsChecked}
      loadingDiscard={loadingDiscard}
      loadingReprocess={loadingReprocess}
      onChangeSearch={handleSearch}
      onChangeToggle={handleChangeToggle}
      onCloseModal={onCloseModal}
      onDiscard={onDiscard}
      onProcessPersonId={handleProcessPersonId}
      onReprocess={onReprocess}
      disabledBoton={disabledBoton}
      dataSubtmit={dataSubtmit}
      isdiscardPersonsWithErrors={isdiscardPersonsWithErrors}
      isReprocessPersonsWithErrors={isReprocessPersonsWithErrors}
    />
  );
};

export { StatusOfExecutionModal };
export type { StatusOfExecutionModalProps };
