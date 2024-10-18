import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { Grid } from "@inubekit/grid";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { useMediaQueries } from "@inubekit/hooks";

import { AppContext } from "@context/AppContext";
import { tokens } from "@design/tokens";
import {
  StyledWelcomeContainer,
  StyledOutletContainer,
  StyledImage,
} from "./styles";

const SelectBusinessUnitsUI =() =>{
  const {
    "(max-width: 768px)": screenMobile, 
    "(min-width: 769px) and (max-width: 992px)": screenTablet,
    "(min-width: 993px) and (max-width: 2200px)": screenDesktop,
  }: { [key: string]: boolean } = useMediaQueries([
    "(max-width: 768px)",
    "(min-width: 769px) and (max-width: 992px)",
    "(min-width: 993px) and (max-width: 2200px)",
  ]);

  const imageWidth = () => {
    if (screenDesktop) return "240px";
    if (screenTablet) return "200px";
    return "160px";
  };

  const { appData } = useContext(AppContext);
  return (
    <Grid
      templateColumns={screenMobile ? "1fr" : "repeat(2, 1fr)"}
      templateRows={screenMobile ? "minmax(150px, 20vh) 1fr" : "100vh"}
    >
      <StyledWelcomeContainer>
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          height="100%"
          gap={
            screenMobile ? `${tokens.spacing.s200}` : `${tokens.spacing.s400}`
          }
        >
          <Stack direction="column" alignItems="center">
            <Text as="h1" type="headline" size="large">
              Bienvenido a IProcess
            </Text>
          </Stack>
          <StyledImage
            src={appData.businessManager.urlLogo}
            alt="Sistemas Enlinea"
            width={imageWidth()}
          />
        </Stack>
      </StyledWelcomeContainer>
      <StyledOutletContainer>
        <Stack
          alignItems="center"
          justifyContent="center"
          height={screenMobile ? "70vh" : "-webkit-fill-available"}
          padding={`${tokens.spacing.s400} ${tokens.spacing.s200}`}
        >
          <Outlet />
        </Stack>
      </StyledOutletContainer>
    </Grid>
  );
}

export { SelectBusinessUnitsUI };
