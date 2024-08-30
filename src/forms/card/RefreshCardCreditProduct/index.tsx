import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";

import { EnumProcessCoverageData } from "@services/enumerators/getEnumeratorsProcessCoverage";
import {
  IStartProcessEntry,
  IEntries,
  IFieldsEntered,
  IEnumeratorsProcessCoverage,
} from "@forms/types";
import { RefreshCardCreditProductUI } from "./interface";

const validationSchema = Yup.object({
  typeRefresh: Yup.string().required("Este campo no puede estar vacío"),
  descriptionComplementary: Yup.string(),
  plannedExecutionDate: Yup.string(),
});

interface RefreshCardCreditProductProps {
  data: IEntries;
  onStartProcess: () => void;
  setFieldsEntered: (show: IFieldsEntered) => void;
}

const initialValues: IStartProcessEntry = {
  descriptionComplementary: "",
  typeRefresh: "",
  plannedExecutionDate: "",
};

const RefreshCardCreditProduct = (props: RefreshCardCreditProductProps) => {
  const { data, setFieldsEntered, onStartProcess } = props;

  const [dynamicValidationSchema, setDynamicValidationSchema] =
    useState(validationSchema);

  const [optionsTypeRefresh, setOptionsTypeRefresh] = useState<
    IEnumeratorsProcessCoverage[]
  >([]);

  const validateOptionsTypeRefresh = async () => {
    try {
      const newOptions = await EnumProcessCoverageData();

      setOptionsTypeRefresh(newOptions);
    } catch (error) {
      console.info(error);
    }
  };

  useEffect(() => {
    validateOptionsTypeRefresh();
  }, []);

  const formik = useFormik({
    initialValues,
    validationSchema: dynamicValidationSchema,
    validateOnChange: false,
    onSubmit: async () => true,
  });

  const handleChange = (name: string, value: string) => {
    formik.setFieldValue(name, value).then(()=> {
      formik.validateForm().then((errors) => {
        formik.setErrors(errors);
      });
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
    <RefreshCardCreditProductUI
      formik={formik}
      data={data}
      optionsTypeRefresh={optionsTypeRefresh}
      onChange={handleChange}
      onStartProcess={onStartProcess}
      comparisonData={comparisonData}
    />
  );
};

export type { RefreshCardCreditProductProps };
export { RefreshCardCreditProduct };
