import { useFormik } from "formik";
import {date, object, string as stringYup } from "yup";
import { useContext, useEffect, useState } from "react";

import { EnumProcessCoverageData } from "@services/enumerators/getEnumeratorsProcessCoverage";
import {
  IStartProcessEntry,
  IEntries,
  IFieldsEntered,
  IEnumeratorsProcessCoverage,
} from "@forms/types";
import { AppContext } from "@context/AppContext";
import { comparisonDataForms, validateExecutionWay } from "@forms/utils";
import { formatDateEndpoint } from "@utils/dates";
import { RefreshSavingProductCardUI } from "./interface";

const validationSchema = object({
  typeRefresh: stringYup().required("Este campo no puede estar vacío"),
  descriptionComplementary: stringYup(),
  plannedExecutionDate: stringYup(),
  cutOffDate: date(),
});

interface RefreshSavingProductCardProps {
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

const RefreshSavingProductCard = (props: RefreshSavingProductCardProps) => {
  const { data, setFieldsEntered, onStartProcess } = props;
  const { appData } = useContext(AppContext);
  const [dynamicValidationSchema, setDynamicValidationSchema] =
    useState(validationSchema);

  const [optionsTypeRefresh, setOptionsTypeRefresh] = useState<
    IEnumeratorsProcessCoverage[]
  >([]);

  const validateOptionsTypeRefresh = async () => {
    try {
      const newOptions = await EnumProcessCoverageData(appData.businessUnit.publicCode);

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
          cutOfDate:
          formik.values.typeRefresh === "MIGRATION"
            ? (formik.values.cutOffDate ||  formatDateEndpoint(new Date(data.date as Date)))
            : "",
        },
      };
      setFieldsEntered(dataForm);
    }
  }, [formik.values, setFieldsEntered]);

  const comparisonData = comparisonDataForms(data?.executionWay as string ,formik.values ,initialValues)

  return (
    <RefreshSavingProductCardUI
      formik={formik}
      data={data}
      optionsTypeRefresh={optionsTypeRefresh}
      onChange={handleChange}
      onStartProcess={onStartProcess}
      comparisonData={comparisonData}
    />
  );
};

export type { RefreshSavingProductCardProps };
export { RefreshSavingProductCard };
