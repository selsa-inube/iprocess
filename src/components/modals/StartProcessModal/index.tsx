import { useFormik } from "formik";
import * as Yup from "yup";

import { StartProcessModalUI } from "./interface";
import { IEntries, ILabel } from "../MoreDetailsModal/types";
import { IStartProcessEntry } from "./types";
import { useEffect } from "react";

const validationSchema = Yup.object({
  descriptionComplementary: Yup.string(),
});

interface StartProcessModalProps {
  portalId: string;
  data: IEntries;
  labels: ILabel[];
  onCloseModal: () => void;
  handleStartProcess: () => void;
  setDescriptionComplementary: (show: string) => void;
}

const initialValues: IStartProcessEntry = {
  descriptionComplementary: "",
};

const StartProcessModal = (props: StartProcessModalProps) => {
  const {
    portalId,
    data,
    labels,
    handleStartProcess,
    onCloseModal,
    setDescriptionComplementary,
  } = props;

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnChange: false,
    onSubmit: async () => true,
  });

  useEffect(() => {
    if (formik.values.descriptionComplementary.length > 0) {
      setDescriptionComplementary(formik.values.descriptionComplementary);
    }
  }, [formik.values.descriptionComplementary, setDescriptionComplementary]);

  return (
    <StartProcessModalUI
      formik={formik}
      portalId={portalId}
      data={data}
      labels={labels}
      onCloseModal={onCloseModal}
      handleStartProcess={handleStartProcess}
    />
  );
};

export type { StartProcessModalProps };
export { StartProcessModal };
