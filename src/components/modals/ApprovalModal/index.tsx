import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";

import { ApprovalModalUI } from "./interface";
import { IApprovalEntry } from "./types";

const validationSchema = Yup.object({
  approval: Yup.boolean().required(""),
  observation: Yup.string().required(""),
});

interface ApprovalModalProps {
  portalId: string;
  onCloseModal: () => void;
}

const initialValues: IApprovalEntry = {
  approval: false,
  observation: "",
};

const ApprovalModal = (props: ApprovalModalProps) => {
  const { portalId, onCloseModal } = props;
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

  const dataComparison =
    JSON.stringify(initialValues.observation) !==
      JSON.stringify(formik.values.observation);

  const handleConfirm = () => {};

  return (
    <ApprovalModalUI
      formik={formik}
      loading={loading}
      dataComparison={dataComparison}
      approvalChecked={approvalChecked}
      portalId={portalId}
      handleConfirm={handleConfirm}
      onCloseModal={onCloseModal}
      handleChange={handleChange}
    />
  );
};

export type { ApprovalModalProps };
export { ApprovalModal };
