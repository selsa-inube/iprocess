import * as Yup from "yup";
import { useEffect, useState } from "react";
import { useFormik } from "formik";

import { appearances } from "@pages/startProcess/types";
import { DecisionModalUI } from "./interface";
import { IDecisionEntry } from "./types";

const validationSchema = Yup.object({
  justification: Yup.string(),
});

interface DecisionModalProps {
  actionText: string;
  description: string;
  portalId: string;
  title: string;
  onClick: () => void;
  onCloseModal: () => void;
  appearance?: appearances;
  isLoading?: boolean;
  justificationOfDecision?: boolean;
  setFieldEntered?: (value: string) => void;
}

const initialValues: IDecisionEntry = {
  justification: "",
};

const DecisionModal = (props: DecisionModalProps) => {
  const {
    actionText,
    appearance = "primary",
    description,
    isLoading = false,
    justificationOfDecision = false,
    portalId,
    title,
    onClick,
    onCloseModal,
    setFieldEntered,
  } = props;

  const [dynamicValidationSchema, setDynamicValidationSchema] =
    useState(validationSchema);

  const formik = useFormik({
    initialValues,
    validationSchema: dynamicValidationSchema,
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: async () => true,
  });

  useEffect(() => {
    if (justificationOfDecision) {
      setDynamicValidationSchema(
        validationSchema.shape({
          justification: Yup.string()
            .required("Este campo es requerido")
            .min(5, "Este campo debe tener al menos 5 caracteres")
            .max(130, "Este campo debe tener maximo 130 caracteres"),
        })
      );
    }
  }, [justificationOfDecision, setDynamicValidationSchema]);

  useEffect(() => {
    if (formik.values && setFieldEntered)
      setFieldEntered(formik.values.justification);
  }, [formik.values, setFieldEntered]);

  const comparisonData = Boolean(
    justificationOfDecision &&
      formik.values.justification === initialValues.justification
  );

  return (
    <DecisionModalUI
      actionText={actionText}
      appearance={appearance}
      comparisonData={comparisonData}
      description={description}
      formik={formik}
      isLoading={isLoading}
      justificationOfDecision={justificationOfDecision}
      onClick={onClick}
      onCloseModal={onCloseModal}
      portalId={portalId}
      title={title}
    />
  );
};

export { DecisionModal };
export type { DecisionModalProps };
