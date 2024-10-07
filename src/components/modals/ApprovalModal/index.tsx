import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";

import { ApprovalModalUI } from "./interface";
import { IApprovalEntry } from "./types";

const validationSchema = Yup.object({
  approval: Yup.boolean().required(""),
  observation: Yup.string().required("Este campo no debe estar vacío"),
});

interface ApprovalModalProps {
  portalId: string;
  setFieldsEntered: (show: IApprovalEntry) => void; 
  onCloseModal: () => void;
  onConfirm: () => void;
}

const initialValues: IApprovalEntry = {
  approval: false,
  observation: "",
};

const ApprovalModal = (props: ApprovalModalProps) => {
  const { portalId, setFieldsEntered, onCloseModal, onConfirm } = props;
  const [approvalChecked, setApprovalChecked] = useState(false);
  const [loading] = useState(false);

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnChange: false,
    onSubmit: async () => true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApprovalChecked(e.target.checked);
    formik.setFieldValue("approval", e.target.checked);
  };

  useEffect(() => {
    if (formik.values) {
      const dataForm = {
        approval: formik.values.approval,
        observation: formik.values.observation,
      };
      setFieldsEntered(dataForm);
    }
  }, [formik.values, setFieldsEntered]);

  const dataComparison =
    JSON.stringify(initialValues.observation) !==
      JSON.stringify(formik.values.observation);

  return (
    <ApprovalModalUI
      formik={formik}
      loading={loading}
      dataComparison={dataComparison}
      approvalChecked={approvalChecked}
      portalId={portalId}
      handleConfirm={onConfirm}
      onCloseModal={onCloseModal}
      handleChange={handleChange}
    />
  );
};

export type { ApprovalModalProps };
export { ApprovalModal };
