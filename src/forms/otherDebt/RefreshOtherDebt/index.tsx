import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";

import { IStartProcessEntry, IEntries, IFieldsEntered } from "@src/forms/types";
import { RefreshOtherDebtUI } from "./interface";

const validationSchema = Yup.object({
  descriptionComplementary: Yup.string(),
  plannedExecutionDate: Yup.string(),
});

interface RefreshOtherDebtProps {
  data: IEntries;
  onStartProcess: () => void;
  setFieldsEntered: (show: IFieldsEntered) => void;
}

const initialValues: IStartProcessEntry = {
  descriptionComplementary: "",
  plannedExecutionDate: "",
};

const RefreshOtherDebt = (props: RefreshOtherDebtProps) => {
  const { data, setFieldsEntered, onStartProcess } = props;

  const [dynamicValidationSchema, setDynamicValidationSchema] =
  useState(validationSchema);

const formik = useFormik({
  initialValues,
  validationSchema: dynamicValidationSchema,
  validateOnChange: false,
  onSubmit: async () => true,
});



useEffect(() => {
  if (
    data?.plannedAutomaticExecution &&
    data?.plannedAutomaticExecution === "planned automatic execution"
  ) {
    setDynamicValidationSchema(
      validationSchema.shape({
        plannedExecutionDate: Yup.string().required(
          "Este campo es requerido"
        ),
      })
    );
  }
}, [data?.plannedAutomaticExecution, setDynamicValidationSchema]);

useEffect(() => {
  if (formik.values) {
    setFieldsEntered(formik.values);
  }
}, [formik.values, setFieldsEntered]);

const comparisonData = Boolean(
  (data?.plannedAutomaticExecution &&
    formik.values.plannedExecutionDate.length > 0 &&
    formik.values.plannedExecutionDate !==
      initialValues.plannedExecutionDate) 
);

return (
  <RefreshOtherDebtUI
    formik={formik}
    data={data}
    onStartProcess={onStartProcess}
    comparisonData={comparisonData}
  />
);
};

export type { RefreshOtherDebtProps };
export { RefreshOtherDebt };
