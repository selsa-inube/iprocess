import { useContext, useEffect, useRef, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { MdOutlineChevronRight } from "react-icons/md";
import { useAuth0 } from "@auth0/auth0-react";
import {
  useMediaQuery,
  Stack,
  Text,
  Grid,
  Icon,
  Spinner,
  Header,
  Nav,
} from "@inubekit/inubekit";

import { actionsConfig, navConfig, userMenu } from "@config/nav";
import { AppContext } from "@context/AppContext";
import { BusinessUnitChange } from "@design/inputs/BusinessUnitChange";
import { IBusinessUnitsPortalStaff } from "@ptypes/staffPortalBusiness.types";
import { decrypt } from "@utils/encrypt";
import { useOptionsByBusinessunits } from "@hooks/useOptionsByBusinessunits";
import { tokens } from "@design/tokens";
import {
  StyledAppPage,
  StyledCollapse,
  StyledCollapseIcon,
  StyledContainer,
  StyledContentImg,
  StyledHeaderContainer,
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
  const {
    appData,
    businessUnitsToTheStaff,
    setBusinessUnitSigla,
    businessUnitSigla,
  } = useContext(AppContext);
  const { logout } = useAuth0();
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

  const location = useLocation();

  return (
    <StyledAppPage>
      {loading ? (
        <Stack gap={tokens.spacing.s200} direction="column" padding="300px">
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
              <StyledHeaderContainer>
                <Header
                  portalId="portal"
                  navigation={navConfig(optionsCards)}
                  user={{
                    username: appData.user.userName,
                    breakpoint: "848px",
                  }}
                  logoURL={renderLogo(appData.businessUnit.urlLogo)}
                  menu={userMenu}
                />
              </StyledHeaderContainer>
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
                  height={"95vh"}
                >
                  {!isTablet && optionsCards && (
                    <Nav
                      navigation={
                        navConfig(optionsCards, location as unknown as Location)
                          .items
                      }
                      actions={actionsConfig(logout)}
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
