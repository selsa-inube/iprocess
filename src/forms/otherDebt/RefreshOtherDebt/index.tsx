import { useFormik } from "formik";
import {date, object, string as stringYup } from "yup";
import { useEffect, useState } from "react";
import {
  IStartProcessEntry,
  IEntries,
  IFieldsEntered,
} from "@forms/types";
import { comparisonDataForms, validateExecutionWay } from "@forms/utils";
import { formatDateEndpoint } from "@utils/dates";
import { RefreshOtherDebtUI } from "./interface";

const validationSchema = object({
  typeRefresh: stringYup().required("Este campo no puede estar vacío"),
  descriptionComplementary: stringYup(),
  plannedExecutionDate: stringYup(),
  cutOffDate: date(),
});

interface RefreshOtherDebtProps {
  data: IEntries;
  onStartProcess: () => void;
  setFieldsEntered: (show: IFieldsEntered) => void;
}

const initialValues: IStartProcessEntry = {
  descriptionComplementary: "",
  typeRefresh: "",
  plannedExecutionDate: "",
  cutOffDate: "",
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

  const handleChange = (name: string, value: string) => {
    formik.setFieldValue(name, value).then(() => {
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
          plannedExecutionDate: stringYup().required(
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
          cutOffDate: formik.values.cutOffDate ||  formatDateEndpoint(new Date(data.date as Date)),
        },
      };
      setFieldsEntered(dataForm);
    }
  }, [formik.values, setFieldsEntered]);

  const comparisonData = comparisonDataForms(data?.executionWay as string ,formik.values ,initialValues)

  return (
    <RefreshOtherDebtUI
      formik={formik}
      data={data}
      onChange={handleChange}
      onStartProcess={onStartProcess}
      comparisonData={comparisonData}
    />
  );
};

export type { RefreshOtherDebtProps };
export { RefreshOtherDebt };
