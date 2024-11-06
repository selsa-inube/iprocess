import { useFormik } from "formik";
import {object, string as stringYup } from "yup";
import { useEffect, useState } from "react";

import { IStartProcessEntry, IEntries, IFieldsEntered } from "@forms/types";
import { validateExecutionWay } from "@forms/utils";
import { RefreshInterestStatusUpdateUI } from "./interface";

const validationSchema = object({
  descriptionComplementary: stringYup(),
  plannedExecutionDate: stringYup(),
});

interface RefreshInterestStatusUpdateProps {
  data: IEntries;
  onStartProcess: () => void;
  setFieldsEntered: (show: IFieldsEntered) => void;
}

const initialValues: IStartProcessEntry = {
  descriptionComplementary: "",
  plannedExecutionDate: "",
};

const RefreshInterestStatusUpdate = (
  props: RefreshInterestStatusUpdateProps
) => {
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
      data?.executionWay &&
      validateExecutionWay(data?.executionWay as string)
    ) {
      setDynamicValidationSchema(
        validationSchema.shape({
          plannedExecutionDate: stringYup().required(
            "Este campo es requerido"
          ),
        })
      );
    }
  }, [data?.executionWay, setDynamicValidationSchema]);

  useEffect(() => {
    if (formik.values) {
      setFieldsEntered(formik.values);
    }
  }, [formik.values, setFieldsEntered]);

  const comparisonData = Boolean(
    formik.values.plannedExecutionDate !== initialValues.plannedExecutionDate
  );

  return (
    <RefreshInterestStatusUpdateUI
      formik={formik}
      data={data}
      onStartProcess={onStartProcess}
      comparisonData={comparisonData}
    />
  );
};

export type { RefreshInterestStatusUpdateProps };
export { RefreshInterestStatusUpdate };
