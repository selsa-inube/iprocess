import { FormikValues } from "formik";
import { ChangeEvent } from "react";
import { Select } from "@inubekit/select";

import { IServerDomain } from "@src/types/domain.types";
import { StyledContainer } from "./styles";

interface YearPickerProps {
  formik: FormikValues;
  laterYears: number;
  previousYears: number;
}

const optionsYears = (laterYears: number, previousYears: number):IServerDomain[] => {
   const today = new Date();
   const currentYear = today.getFullYear();
   const years:IServerDomain[] = [];

   for (let i = 0; i <= laterYears; i++) {
     years.push({
       id: String(currentYear + i),
       label: String(currentYear + i),
     });
   }

   for (let i = 1; i <= previousYears; i++) {
     years.unshift({
       id: String(currentYear - i),
       label: String(currentYear - i),
     });
   }
   return years;
 };


const YearPicker = (props: YearPickerProps) => {
  const { formik, laterYears, previousYears } = props;

  const getFieldState = (formik: FormikValues, fieldName: string) => {
    if (formik.errors[fieldName]) return "invalid";
  };
 
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    formik.setFieldValue("year", event.target.innerText);
  };

  return (
    <StyledContainer>
      <Select
        disabled={false}
        fullwidth={true}
        id="year"
        label="Año"
        name="year"
        onChange={handleChange}
        options={optionsYears(laterYears,previousYears)}
        placeholder="Seleccione un año"
        size="wide"
        status={getFieldState(formik, "year")}
        value={formik.values.year}
      />
    </StyledContainer>
  );
};

export { YearPicker };
