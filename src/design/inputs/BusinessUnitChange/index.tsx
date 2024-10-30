import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { MdCheck } from "react-icons/md";
import { Stack } from "@inubekit/stack";
import { Icon } from "@inubekit/icon";

import { AppContext } from "@context/AppContext";
import { IBusinessUnitsPortalStaff } from "@ptypes/staffPortalBusiness.types";
import {
  StyledContainer,
  StyledUl,
  StyledLi,
  StyledImg,
  StyledHr,
} from "./styles";

interface BusinessUnitChangeProps {
  businessUnits: IBusinessUnitsPortalStaff[];
} 

export const BusinessUnitChange = (props: BusinessUnitChangeProps) => {
  const {businessUnits} = props;
  const { appData, setBusinessUnitSigla } = useContext(AppContext);
  const [selectedClient, setSelectedClient] = useState<string>("");

  useEffect(() => {
    if (appData.businessUnit.publicCode) {
      setSelectedClient(appData.businessUnit.abbreviatedName);
    }
  }, []);

  const handleLogoClick = (businessUnit: IBusinessUnitsPortalStaff) => {
    const selectJSON = JSON.stringify(businessUnit);
      setBusinessUnitSigla(selectJSON);
    setSelectedClient(businessUnit.abbreviatedName);
  };

  return (
    <StyledContainer>
      <Stack width="200px">
        <StyledUl>
          {businessUnits.map((businessUnit, index) => (
            <Link
              key={businessUnit.publicCode}
              to=".."
              onClick={() => handleLogoClick(businessUnit)}
            >
              <StyledLi>
                <StyledImg src={businessUnit.urlLogo} alt={businessUnit.abbreviatedName} />
                {selectedClient === businessUnit.abbreviatedName && (
                  <Icon
                    icon={<MdCheck />}
                    appearance="primary"
                    size="24px"
                    cursorHover
                  />
                )}
              </StyledLi>
              {index !== businessUnits.length - 1 && <StyledHr />}
            </Link>
          ))}
        </StyledUl>
      </Stack>
    </StyledContainer>
  );
};
