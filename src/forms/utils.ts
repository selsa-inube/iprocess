import { FormikValues } from "formik";
import { IStartProcessEntry } from "./types";

const executionWay = ["PlannedAutomaticExecution"];

const validateExecutionWay = (entry: string): boolean => {
  return executionWay.includes(entry);
};

const comparisonDataForms = (
  executionWay: string,
  initialValues: IStartProcessEntry,
  values: IStartProcessEntry
): boolean => {
  if (validateExecutionWay(executionWay)) {
    return (
      values.typeRefresh !== initialValues.typeRefresh &&
      values.plannedExecutionDate !== initialValues.plannedExecutionDate
    );
  } else {
    return values.typeRefresh !== initialValues.typeRefresh;
  }
};

const getFieldState = (formik: FormikValues, fieldName: string) => {
  if (formik.errors[fieldName]) return "invalid";
};

export { validateExecutionWay, comparisonDataForms, getFieldState };
