import { useContext } from "react";
import { MdOutlineDoorFront } from "react-icons/md";
import { Header } from "@inubekit/header";

import { AppCard } from "@components/feedback/AppCard";
import { nav } from "@config/nav";
import { Title } from "@design/data/Title";
import { AppContext } from "@context/AppContext";
import { ICardData } from "./types";
import {
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

  const { appData } = useContext(AppContext);

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
        
          />
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
