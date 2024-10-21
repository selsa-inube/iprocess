import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AppContext } from "@context/AppContext";
import { BusinessUnitsUI } from "./interface";
import { IBusinessUnit, IBusinessUnits, IBusinessUnitstate } from "./types";


function BusinessUnits({ businessUnits }: IBusinessUnits) {
  const [search, setSearch] = useState("");
  const [businessUnitLocal, setBusinessUnitLocal] =
    useState<IBusinessUnitstate>({
      ref: null,
      value: true,
    });

  const navigate = useNavigate();
  const { setBusinessUnitSigla } = useContext(AppContext);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (businessUnitLocal.ref) {
      businessUnitLocal.ref.checked = false;
    }
    setBusinessUnitLocal({ ref: null, value: true });
    setSearch(event.target.value);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBusinessUnitLocal({ ref: event.target, value: false });


    const selectOption = businessUnits.find(
      (businessUnit0) => businessUnit0.name === event.target.value
    );
    const selectJSON = JSON.stringify(selectOption);
    selectOption && setBusinessUnitSigla(selectJSON);
  };

  const handleSubmit = () => {
    navigate("/selectBusinessUnit/loading-app");
  };

  function filterBusinessUnits(businessUnit: IBusinessUnit[], search: string) {
    return businessUnit.filter((businessUnit) => {
      const businessUnitName = businessUnit.name.toUpperCase();
      const businessUnitSigla = businessUnit.sigla.toUpperCase();
      const searchTerm = search.toUpperCase();
      return (
        businessUnitName.includes(searchTerm) ||
        businessUnitSigla.includes(searchTerm)
      );
    });
  }

  return (
    <BusinessUnitsUI
      businessUnits={businessUnits}
      search={search}
      businessUnit={businessUnitLocal}
      handleSearchChange={handleSearchChange}
      handleBussinessUnitChange={handleChange}
      filterBusinessUnits={filterBusinessUnits}
      handleSubmit={handleSubmit}
    />
  );
}

export { BusinessUnits };
