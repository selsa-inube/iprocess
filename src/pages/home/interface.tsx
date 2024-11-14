import { useContext, useEffect, useRef, useState } from "react";
import { MdOutlineChevronRight, MdOutlineDoorFront } from "react-icons/md";
import { Header } from "@inubekit/header";
import { Icon } from "@inubekit/icon";
import { useMediaQuery } from "@inubekit/hooks";
import { Text } from "@inubekit/text";

import { AppCard } from "@components/feedback/AppCard";
import { navConfig, userMenu } from "@config/nav";
import { Title } from "@design/data/Title";
import { AppContext } from "@context/AppContext";
import { BusinessUnitChange } from "@design/inputs/BusinessUnitChange";
import { IBusinessUnitsPortalStaff } from "@ptypes/staffPortalBusiness.types";
import { ICardData } from "./types";
import {
  StyledCollapse,
  StyledCollapseIcon,
  StyledContainer,
  StyledContainerCards,
  StyledContainerSection,
  StyledContentImg,
  StyledFooter,
  StyledHeaderContainer,
  StyledLogo,
  StyledTitle,
} from "./styles";

interface HomeProps {
  selectedClient: string;
  setSelectedClient: (show: string) => void;
  data?: ICardData[];
  isLoading?: boolean;
}

const renderLogo = (imgUrl: string) => {
  return (
    <StyledContentImg to="/">
      <StyledLogo src={imgUrl} />
    </StyledContentImg>
  );
};

function HomeUI(props: HomeProps) {
  const { data, isLoading, selectedClient, setSelectedClient } = props;

  const { appData, businessUnitsToTheStaff, setBusinessUnitSigla } =
    useContext(AppContext);
  const [collapse, setCollapse] = useState(false);
 

  const collapseMenuRef = useRef<HTMLDivElement>(null);
  const businessUnitChangeRef = useRef<HTMLDivElement>(null);
  const isTablet = useMediaQuery("(max-width: 944px)");
  const username = appData.user.userName.split(" ")[0];

  useEffect(() => {
    if (appData.businessUnit.publicCode) {
      setSelectedClient(appData.businessUnit.abbreviatedName);
    }
  }, [appData]);

  const handleLogoClick = (businessUnit: IBusinessUnitsPortalStaff) => {
    const selectJSON = JSON.stringify(businessUnit);
    setBusinessUnitSigla(selectJSON);
    setSelectedClient(businessUnit.abbreviatedName);
    window.location.reload();
  };
 
  return (
    <>
      <StyledContainer>
        <StyledHeaderContainer>
            <Header
              portalId="portal"
              navigation={navConfig(data || [])}
              logoURL={renderLogo(appData.businessUnit.urlLogo)}
              userName={appData.user.userName}
              userMenu={userMenu}
            />

          {businessUnitsToTheStaff.length > 1 && (
            <>
              <StyledCollapseIcon
                $collapse={collapse}
                onClick={() => setCollapse(!collapse)}
                $isTablet={isTablet}
                ref={collapseMenuRef}
              >
                <Icon
                  icon={<MdOutlineChevronRight />}
                  appearance="primary"
                  size="24px"
                  cursorHover
                />
              </StyledCollapseIcon>
              {collapse && (
                <StyledCollapse ref={businessUnitChangeRef}>
                  <BusinessUnitChange
                    businessUnits={businessUnitsToTheStaff}
                    onLogoClick={handleLogoClick}
                    selectedClient={selectedClient}
                  />
                </StyledCollapse>
              )}
            </>
          )}
        </StyledHeaderContainer>
        <StyledContainerSection>
          <StyledTitle>
            <Title
              title={`Bienvenid@, ${username}`}
              description="Selecciona una opción para empezar a ajustar la configuración de tu software Linix"
              icon={<MdOutlineDoorFront />}
              sizeTitle="large"
            />
          </StyledTitle>
          <StyledContainerCards>
            {isLoading ? (
              <>
                <AppCard isLoading={isLoading} />
                <AppCard isLoading={isLoading} />
              </>
            ) : (
              <>
                {data && data?.length > 0 ? (
                  data?.map((card) => (
                    <AppCard
                      key={card.id}
                      label={card.label}
                      description={card.description}
                      icon={card.icon}
                      url={card.url}
                      isLoading={isLoading}
                    />
                  ))
                ) : (
                  <Text type="body" size="medium">
                    No se encontró información
                  </Text>
                )}{" "}
              </>
            )}
          </StyledContainerCards>
        </StyledContainerSection>
        <StyledFooter>
          <StyledLogo src={appData.businessManager.urlBrand} />
        </StyledFooter>
      </StyledContainer>
    </>
  );
}

export { HomeUI };
