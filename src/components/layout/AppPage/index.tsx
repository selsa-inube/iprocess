import { useContext, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import { MdOutlineChevronRight } from "react-icons/md";
import { Grid } from "@inubekit/grid";
import { Header } from "@inubekit/header";
import { Nav } from "@inubekit/nav";
import { useMediaQuery } from "@inubekit/hooks";
import { Icon } from "@inubekit/icon";

import { nav, userMenu } from "@config/nav";
import { AppContext } from "@context/AppContext";
import { BusinessUnitChange } from "@design/inputs/BusinessUnitChange";
import {
  StyledAppPage,
  StyledCollapse,
  StyledCollapseIcon,
  StyledContainer,
  StyledContentImg,
  StyledLogo,
  StyledMain,
} from "./styles";

const renderLogo = (imgUrl: string) => {
  return (
    <StyledContentImg to="/">
      <StyledLogo src={imgUrl} />
    </StyledContentImg>
  );
};

function AppPage() {
  const { appData, businessUnitsToTheStaff } = useContext(AppContext);
  const [collapse, setCollapse] = useState(false);
  const collapseMenuRef = useRef<HTMLDivElement>(null);
  const businessUnitChangeRef = useRef<HTMLDivElement>(null);
  const isTablet = useMediaQuery("(max-width: 944px)");

  console.log("businessUnitsToTheStaff", businessUnitsToTheStaff, businessUnitsToTheStaff.length);

  return (
    <StyledAppPage>
      <Grid templateRows="auto 1fr" height="100vh" justifyContent="unset">
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
        <StyledContainer>
          <Grid
            templateColumns={!isTablet ? "auto 1fr" : "1fr"}
            alignContent="unset"
          >
            {!isTablet && (
              <Nav
                navigation={nav}
                logoutPath="/logout"
                logoutTitle="Cerrar sesión"
              />
            )}
            <StyledMain>
              <Outlet />
            </StyledMain>
          </Grid>
        </StyledContainer>
      </Grid>
    </StyledAppPage>
  );
}

export { AppPage };
