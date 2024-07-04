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
  selectedDate: (show: IChangeDateEntry) => void;
}

const initialValues: IChangeDateEntry = {
  month: "",
  year: "",
};

const ChangeDateModal = (props: ChangeDateModalProps) => {
  const { laterYears, previousYears, portalId, onCloseModal, selectedDate } =
    props;

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnChange: false,
    onSubmit: async () => true,
  });

  const disabledButton =
    JSON.stringify(formik.values.month) !==
      JSON.stringify(initialValues.month) &&
    JSON.stringify(formik.values.year) !== JSON.stringify(initialValues.year);

  const handleConsult = () => {
    selectedDate(formik.values);
    onCloseModal();
  };

  return (
    <ChangeDateModalUI
      formik={formik}
      disabledButton={disabledButton}
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
