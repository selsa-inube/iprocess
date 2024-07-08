import { useFormik } from "formik";
import * as Yup from "yup";

import { ChangePeriodModalUI } from "./interface";
import { IChangePeriodEntry } from "./types";

const validationSchema = Yup.object({
  month: Yup.string().required("Este campo no puede estar vacío"),
  year: Yup.string().required("Este campo no puede estar vacío"),
});

interface ChangePeriodModalProps {
  laterYears: number;
  previousYears: number;
  portalId: string;
  selectedMonth: string;
  selectedYear: string;
  onCloseModal: () => void;
  selectedDate: (show: IChangePeriodEntry) => void;
}

const initialValues: IChangePeriodEntry = {
  month: "",
  year: "",
};

const ChangePeriodModal = (props: ChangePeriodModalProps) => {
  const { laterYears, previousYears, portalId, selectedMonth,
    selectedYear, onCloseModal, selectedDate } =
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
    selectedDate({ ...formik.values, change: true });
    onCloseModal();
  };

  return (
    <ChangePeriodModalUI
      formik={formik}
      disabledButton={disabledButton}
      onCloseModal={onCloseModal}
      laterYears={laterYears}
      selectedMonth={selectedMonth}
      selectedYear={selectedYear}
      previousYears={previousYears}
      portalId={portalId}
      handleConsult={handleConsult}
    />
  );
};

export type { ChangePeriodModalProps };
export { ChangePeriodModal };
