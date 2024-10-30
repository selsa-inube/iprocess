import { useContext, useRef, useState } from "react";
import { MdOutlineChevronRight, MdOutlineDoorFront } from "react-icons/md";
import { Header } from "@inubekit/header";
import { Icon } from "@inubekit/icon";
import { useMediaQuery } from "@inubekit/hooks";

import { AppCard } from "@components/feedback/AppCard";
import { nav, userMenu } from "@config/nav";
import { Title } from "@design/data/Title";
import { AppContext } from "@context/AppContext";
import { BusinessUnitChange } from "@design/inputs/BusinessUnitChange";
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
  data?: ICardData[];
}

const renderLogo = (imgUrl: string) => {
  return (
    <StyledContentImg to="/">
      <StyledLogo src={imgUrl} />
    </StyledContentImg>
  );
};

function HomeUI(props: HomeProps) {
  const { data } = props;

  const { appData, businessUnitsToTheStaff } = useContext(AppContext);
  const [collapse, setCollapse] = useState(false);
  const collapseMenuRef = useRef<HTMLDivElement>(null);
  const businessUnitChangeRef = useRef<HTMLDivElement>(null);
  const isTablet = useMediaQuery("(max-width: 944px)");
 const username = appData.user.userName.split(" ")[0];
 

 return (
    <>
      <StyledContainer>
        <StyledHeaderContainer>
          <Header
            portalId="portal"
            navigation={nav}
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
                <BusinessUnitChange businessUnits={businessUnitsToTheStaff} />
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
            {data &&
              data.map((card) => (
                <AppCard
                  key={card.id}
                  label={card.label}
                  description={card.description}
                  icon={card.icon}
                  url={card.url}
                />
              ))}
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
