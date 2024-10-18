import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AppContext } from "@context/AppContext";
import { IBusinessUnitsPortalStaff } from "@ptypes/staffPortalBusiness.types";
import { BusinessUnitsUI } from "./interface";
import { IBusinessUnitstate } from "./types";

interface BusinessUnitsProps {
  businessUnits: IBusinessUnitsPortalStaff[];
}

function BusinessUnits(props: BusinessUnitsProps) {
  const { businessUnits } = props;
  const [search, setSearch] = useState("");
  const [selectedBusinessUnit, setSelectedBusinessUnit] =
    useState<IBusinessUnitsPortalStaff | null>(null);
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
      (businessUnit0) => businessUnit0.abbreviatedName === event.target.value
    );
    setSelectedBusinessUnit(selectOption || null);
  };

  const handleSubmit = () => {
    if (selectedBusinessUnit) {
      const selectJSON = JSON.stringify(selectedBusinessUnit);
      setBusinessUnitSigla(selectJSON);
    }
    navigate("/selectBusinessUnit/loading-app");
  };

  function filterBusinessUnits(
    businessUnits: IBusinessUnitsPortalStaff[],
    search: string
  ) {
    const searchTerm = search?.toUpperCase();

    return businessUnits.filter((unit) => {
      const businessUnitName = unit?.abbreviatedName?.toUpperCase() || "";
      const businessUnitSigla = unit?.publicCode?.toUpperCase() || "";

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
