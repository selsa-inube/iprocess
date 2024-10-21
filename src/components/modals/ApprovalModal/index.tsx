import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";

import { ApprovalModalUI } from "./interface";
import { IApprovalEntry } from "./types";

const validationSchema = Yup.object({
  observation: Yup.string().required("Este campo no debe estar vacío"),
});

interface ApprovalModalProps {
  portalId: string;
  approvalChecked: boolean;
  setFieldEntered: (show: IApprovalEntry) => void; 
  onCloseModal: () => void;
  onConfirm: () => void;
}

const initialValues: IApprovalEntry = {
  observation: "",
};

const ApprovalModal = (props: ApprovalModalProps) => {
  const { portalId, approvalChecked, setFieldEntered, onCloseModal, onConfirm } = props;
  const [loading] = useState(false);

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnChange: false,
    onSubmit: async () => true,
  });

  useEffect(() => {
    if (formik.values) {
      const dataForm = {
        observation: formik.values.observation,
      };
      setFieldEntered(dataForm);
    }
  }, [formik.values, setFieldEntered]);

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
    />
  );
};

export type { ApprovalModalProps };
export { ApprovalModal };
