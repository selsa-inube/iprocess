import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { ErrorPage } from "@components/layout/ErrorPage";
import clientNotFound from "@assets/images/Expired.png";
import { enviroment } from "@config/environment";

function ErrorNotBusinessUnit() {
  const { logout } = useAuth0();
  useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    <ErrorPage
            image={clientNotFound}
            imageAlt="Unidad de negocio no encontrada"
            heading="No hay resultados..."
            description="Su usuario no tiene unidades de negocio relacionados, consulte con su administrador."
            onClick={async () => {
              
              logout({ logoutParams: { returnTo: enviroment.REDIRECT_URI } });
            }}
          />
  );
}

export { ErrorNotBusinessUnit };
