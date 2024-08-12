import { FormikValues } from "formik";
import { ChangeEvent, useEffect } from "react";
import { Select } from "@inubekit/select";

import { getDomainById } from "@mocks/domains/domainService.mocks";

import { StyledContainer } from "./styles";

interface MonthPickerProps {
  formik: FormikValues;
  selectedMonth: string;
}

const MonthPicker = (props: MonthPickerProps) => {
  const { formik, selectedMonth } = props;

  useEffect(() => {
    formik.setFieldValue("month", selectedMonth);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getFieldState = (formik: FormikValues, fieldName: string) => {
    if (formik.errors[fieldName]) return "invalid";
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    formik.setFieldValue("month", event.target.innerText);
  };

  return (
    <StyledContainer>
      <Select
        disabled={false}
        id="month"
        label="Mes"
        name="month"
        onChange={handleChange}
        options={getDomainById("month")}
        placeholder="Seleccione un mes"
        required={false}
        size="wide"
        fullwidth={true}
        status={getFieldState(formik, "month")}
        value={formik.values.month}
      />
    </StyledContainer>
  );
};

export { MonthPicker };
