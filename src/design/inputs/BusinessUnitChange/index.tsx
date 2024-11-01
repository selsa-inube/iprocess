import { MdCheck } from "react-icons/md";
import { Stack } from "@inubekit/stack";
import { Icon } from "@inubekit/icon";
import { IBusinessUnitsPortalStaff } from "@ptypes/staffPortalBusiness.types";
import { tokens } from "@design/tokens";
import { ComponentAppearance } from "@ptypes/aparences.types";
import {
  StyledContainer,
  StyledUl,
  StyledLi,
  StyledImg,
  StyledHr,
  StyledContainerOption,
} from "./styles";

interface BusinessUnitChangeProps {
  businessUnits: IBusinessUnitsPortalStaff[];
  selectedClient: string
  onLogoClick: (businessUnit: IBusinessUnitsPortalStaff) => void;
}

export const BusinessUnitChange = (props: BusinessUnitChangeProps) => {
  const { businessUnits, selectedClient, onLogoClick } = props;

  return (
    <StyledContainer>
      <Stack width="200px">
        <StyledUl>
          {businessUnits.map((businessUnit, index) => (
            <StyledContainerOption
              key={businessUnit.publicCode}
              onClick={() => onLogoClick(businessUnit)}
            >
              <StyledLi>
                <StyledImg
                  src={businessUnit.urlLogo}
                  alt={businessUnit.abbreviatedName}
                />
                {selectedClient === businessUnit.abbreviatedName && (
                  <Stack margin={`${tokens.spacing.s0} ${tokens.spacing.s150} ${tokens.spacing.s0}`}>
                  <Icon
                    icon={<MdCheck />}
                    appearance= {ComponentAppearance.PRIMARY}
                    size="24px"
                    cursorHover
                  />
                  </Stack>
                )}
              </StyledLi>
              {index !== businessUnits.length - 1 && <StyledHr />}
            </StyledContainerOption>
          ))}
        </StyledUl>
      </Stack>
    </StyledContainer>
  );
};
