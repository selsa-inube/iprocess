import { useFormik } from "formik";
import * as Yup from "yup";
import { ChangeEvent, useEffect, useState } from "react";

import { IStartProcessEntry, IEntries, IFieldsEntered, IEnumeratorsProcessCoverage } from "@src/forms/types";
import { RefreshSavingCommitmentUI } from "./interface";

import { EnumProcessCoverageData } from "@src/services/enumerators/getEnumeratorsProcessCoverage";

const validationSchema = Yup.object({
  typeRefresh: Yup.string().required("Este campo no puede estar vacío"),
  descriptionComplementary: Yup.string(),
  plannedExecutionDate: Yup.string(),
});

interface RefreshSavingCommitmentProps {
  data: IEntries;
  onStartProcess: () => void;
  setFieldsEntered: (show: IFieldsEntered) => void;
}

const initialValues: IStartProcessEntry = {
  descriptionComplementary: "",
  typeRefresh: "",
  plannedExecutionDate: "",
};

const RefreshSavingCommitment = (props: RefreshSavingCommitmentProps) => {
  const { data, setFieldsEntered, onStartProcess } = props;

  const [dynamicValidationSchema, setDynamicValidationSchema] =
    useState(validationSchema);

    const [optionsTypeRefresh, setOptionsTypeRefresh] = useState<IEnumeratorsProcessCoverage[]>([]);

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
    <RefreshSavingCommitmentUI
      formik={formik}
      data={data}
      optionsTypeRefresh={optionsTypeRefresh}
      onChange={handleChange}
      onStartProcess={onStartProcess}
      comparisonData={comparisonData}
    />
  );
};

export type { RefreshSavingCommitmentProps };
export { RefreshSavingCommitment };