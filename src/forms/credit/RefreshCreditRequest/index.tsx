import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";

import { IStartProcessEntry, IEntries, IFieldsEntered, IEnumeratorsProcessCoverage } from "@forms/types";
import { EnumProcessCoverageData } from "@services/enumerators/getEnumeratorsProcessCoverage";
import { comparisonDataForms, validateExecutionWay } from "@forms/utils";
import { RefreshCreditRequestUI } from "./interface";

const validationSchema = Yup.object({
  typeRefresh: Yup.string().required("Este campo no puede estar vacío"),
  descriptionComplementary: Yup.string(),
  plannedExecutionDate: Yup.string(),
});

interface RefreshCreditRequestProps {
  data: IEntries;
  onStartProcess: () => void;
  setFieldsEntered: (show: IFieldsEntered) => void;
}

const initialValues: IStartProcessEntry = {
  descriptionComplementary: "",
  typeRefresh: "",
  plannedExecutionDate: "",
};

const RefreshCreditRequest = (props: RefreshCreditRequestProps) => {
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

const handleChange = (name: string, value: string) => {
  formik.setFieldValue(name, value).then(()=> {
    formik.validateForm().then((errors) => {
      formik.setErrors(errors);
    });
  });
};

useEffect(() => {
  if (
    data?.executionWay &&
    validateExecutionWay(data?.executionWay as string)
  ) {
    setDynamicValidationSchema(
      validationSchema.shape({
        plannedExecutionDate: Yup.string().required(
          "Este campo es requerido"
        ),
      })
    );
  }
}, [data?.executionWay, setDynamicValidationSchema]);

useEffect(() => {
  if (formik.values) {
    const dataForm = {
      descriptionComplementary: formik.values.descriptionComplementary,
      plannedExecutionDate: formik.values.plannedExecutionDate,
      parameters: {
        typeExecution: formik.values.typeRefresh || "",
      },
    };
    setFieldsEntered(dataForm);
  }
}, [formik.values, setFieldsEntered]);

const comparisonData = comparisonDataForms(data?.executionWay as string ,formik.values ,initialValues)

return (
  <RefreshCreditRequestUI
    formik={formik}
    data={data}
    optionsTypeRefresh={optionsTypeRefresh}
    onChange={handleChange}
    onStartProcess={onStartProcess}
    comparisonData={comparisonData}
  />
);
};

export type { RefreshCreditRequestProps };
export { RefreshCreditRequest };
