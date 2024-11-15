import { useContext, useEffect, useRef, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { MdOutlineChevronRight } from "react-icons/md";
import { Grid } from "@inubekit/grid";
import { Header } from "@inubekit/header";
import { Nav } from "@inubekit/nav";
import { useMediaQuery } from "@inubekit/hooks";
import { Icon } from "@inubekit/icon";
import { Spinner } from "@inubekit/spinner";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";

import { navConfig, userMenu } from "@config/nav";
import { AppContext } from "@context/AppContext";
import { BusinessUnitChange } from "@design/inputs/BusinessUnitChange";
import { IBusinessUnitsPortalStaff } from "@ptypes/staffPortalBusiness.types";
import { decrypt } from "@utils/encrypt";
import { useOptionsByBusinessunits } from "@hooks/useOptionsByBusinessunits";

import {
  StyledAppPage,
  StyledCollapse,
  StyledCollapseIcon,
  StyledContainer,
  StyledContentImg,
  StyledLogo,
  StyledMain,
} from "./styles";
import { ErrorPage } from "../ErrorPage";


const renderLogo = (imgUrl: string) => {
  return (
    <StyledContentImg to="/">
      <StyledLogo src={imgUrl} />
    </StyledContentImg>
  );
};

function AppPage() {
  const { appData, businessUnitsToTheStaff, setBusinessUnitSigla, businessUnitSigla } =
    useContext(AppContext);
  const [collapse, setCollapse] = useState(false);
  const collapseMenuRef = useRef<HTMLDivElement>(null);
  const businessUnitChangeRef = useRef<HTMLDivElement>(null);
  const [selectedClient, setSelectedClient] = useState<string>("");
  const portalId = localStorage.getItem("portalCode");
  const staffPortalId = portalId ? decrypt(portalId) : "";

  const { optionsCards, loading } = useOptionsByBusinessunits(
    staffPortalId,
    businessUnitSigla
  );

  const navigate = useNavigate();
  const isTablet = useMediaQuery("(max-width: 849px)");

  useEffect(() => {
    if (appData.businessUnit.publicCode) {
      setSelectedClient(appData.businessUnit.abbreviatedName);
    }
  }, [appData]);

  const handleLogoClick = (businessUnit: IBusinessUnitsPortalStaff) => {
    const selectJSON = JSON.stringify(businessUnit);
    setBusinessUnitSigla(selectJSON);
    setSelectedClient(businessUnit.abbreviatedName);
    setCollapse(false);
    navigate("/");
  };

  return (
    <StyledAppPage>
      {loading ? (
         <Stack gap="16px" direction="column" padding="300px">
         <Stack direction="column">
           <Text type="title" size="small" textAlign="center">
             Espere un momento, por favor.
           </Text>
         </Stack>
         <Stack alignItems="center" direction="column">
           <Spinner size="large" />
         </Stack>
       </Stack>
      ) : (
        <>
          {optionsCards && optionsCards.length > 0 ? (
            <Grid templateRows="auto 1fr" height="100vh" justifyContent="unset">
              <Header
                portalId="portal"
                navigation={navConfig(optionsCards)}
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
              <StyledContainer>
                <Grid
                  templateColumns={!isTablet ? "auto 1fr" : "1fr"}
                  alignContent="unset"
                >
                  {!isTablet && optionsCards && (
                    <Nav
                      navigation={navConfig(optionsCards)}
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
          ) : (
            <ErrorPage />
          )}
        </>
      )}
    </StyledAppPage>
  );
}

export { AppPage };
