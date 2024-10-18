import { useAuth0 } from "@auth0/auth0-react";
import { ErrorPage } from "@components/layout/ErrorPage";
import clientNotFound from "@assets/images/Expired.png";

function ErrorNotBusinessUnit() {
  const { logout } = useAuth0();

  return (
    <ErrorPage
            image={clientNotFound}
            imageAlt="Unidad de negocio no encontrada"
            heading="No hay resultados..."
            description="Su usuario no tiene unidades de negocio relacionados, consulte con su administrador."
            onClick={async () => {
              localStorage.clear();
              logout({ logoutParams: { returnTo: "https://www.google.com" } });
            }}
          />
  );
}

export { ErrorNotBusinessUnit };
