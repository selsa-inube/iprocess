import { useFormik } from "formik";
import * as Yup from "yup";
import { ChangeEvent, useEffect, useState } from "react";

import { IStartProcessEntry, IEntries, IFieldsEntered } from "@src/forms/types";
import { RefreshInterestStatusUpdateUI } from "./interface";

const validationSchema = Yup.object({
  typeRefresh: Yup.string().required("Este campo no puede estar vacío"),
  descriptionComplementary: Yup.string(),
  plannedExecutionDate: Yup.string(),
});

interface RefreshInterestStatusUpdateProps {
  data: IEntries;
  onStartProcess: () => void;
  setFieldsEntered: (show: IFieldsEntered) => void;
}

const initialValues: IStartProcessEntry = {
  descriptionComplementary: "",
  typeRefresh: "",
  plannedExecutionDate: "",
};

const RefreshInterestStatusUpdate = (props: RefreshInterestStatusUpdateProps) => {
  const { data, setFieldsEntered, onStartProcess } = props;

  const [dynamicValidationSchema, setDynamicValidationSchema] =
  useState(validationSchema);

const formik = useFormik({
  initialValues,
  validationSchema: dynamicValidationSchema,
  validateOnChange: false,
  onSubmit: async () => true,
});

const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
  formik.setFieldValue("typeRefresh", event.target.outerText).then(()=>{
    formik.validateForm().then((errors)=>{
      formik.setErrors(errors);
    })
  });
};

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
    formik.values.typeRefresh !== initialValues.typeRefresh &&
    formik.values.plannedExecutionDate !==
      initialValues.plannedExecutionDate) ||
    (!data?.plannedAutomaticExecution &&
      formik.values.typeRefresh !== initialValues.typeRefresh)
);

return (
  <RefreshInterestStatusUpdateUI
    formik={formik}
    data={data}
    onChange={handleChange}
    onStartProcess={onStartProcess}
    comparisonData={comparisonData}
  />
);
};

export type { RefreshInterestStatusUpdateProps };
export { RefreshInterestStatusUpdate };
