import { useFormik } from "formik";
import * as Yup from "yup";

import { ChangeDateModalUI } from "./interface";
import { IChangeDateEntry } from "./types";

const validationSchema = Yup.object({
  month: Yup.string().required("Este campo no puede estar vacío"),
  year: Yup.string().required("Este campo no puede estar vacío"),
});

interface ChangeDateModalProps {
  laterYears: number;
  previousYears: number;
  portalId: string;
  onCloseModal: () => void;
  handleConsult: () => void;
}

const initialValues: IChangeDateEntry = {
  month: "",
  year: "",
};

const ChangeDateModal = (props: ChangeDateModalProps) => {
  const { laterYears, previousYears, portalId, onCloseModal, handleConsult } =
    props;

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnChange: false,
    onSubmit: async () => true,
  });

  const dataComparison =
    JSON.stringify(formik.values.month) !==
      JSON.stringify(initialValues.month) &&
    JSON.stringify(formik.values.year) !== JSON.stringify(initialValues.year);

  return (
    <ChangeDateModalUI
      formik={formik}
      dataComparison={dataComparison}
      onCloseModal={onCloseModal}
      laterYears={laterYears}
      previousYears={previousYears}
      portalId={portalId}
      handleConsult={handleConsult}
    />
  );
};

export type { ChangeDateModalProps };
export { ChangeDateModal };
