import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { useContext } from "react";
import { ThemeProvider } from "styled-components";
import { FlagProvider } from "@inubekit/inubekit";

import { useAuth0 } from "@auth0/auth0-react";
import { ErrorPage } from "@components/layout/ErrorPage";
import { AppPage } from "./components/layout/AppPage";
import { enviroment } from "./config/environment";
import { GlobalStyles } from "./styles/global";
import { ConfirmInitiatedRoutes } from "./routes/confirmInitiated";
import { FinishedRoutes } from "./routes/finished";
import { StartProcessRoutes } from "./routes/startProcess";
import { ValidateProgressRoutes } from "./routes/validateProgress";
import { theme } from "./config/theme";
import { AppContext, AppContextProvider } from "./context/AppContext";
import { usePortalData } from "./hooks/usePortalData";
import { useBusinessManagers } from "./hooks/useBusinessManagers";
import { useAuthRedirect } from "./hooks/useAuthRedirect";
import { SelectBusinessUnits } from "./pages/selectBusinessUnits";
import { SelectBusinessUnitsRoutes } from "./routes/selectBusinessunits";
import { Home } from "./pages/home";

function LogOut() {
  localStorage.clear();
  const { logout } = useAuth0();
  logout({ logoutParams: { returnTo: enviroment.REDIRECT_URI } });
  return <Home />;
}

function FirstPage() {
  const { businessUnitSigla } = useContext(AppContext);

  return businessUnitSigla.length === 0 ? <SelectBusinessUnits /> : <Home />;
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path="selectBusinessUnit/*"
        element={<SelectBusinessUnitsRoutes />}
      />
      <Route path="/" element={<FirstPage />} errorElement={<ErrorPage />}/>
      <Route path="/" element={<AppPage />}>
        <Route path="start-process/*" element={<StartProcessRoutes />} />
        <Route
          path="confirm-initiated/*"
          element={<ConfirmInitiatedRoutes />}
        />
        <Route
          path="validate-progress/*"
          element={<ValidateProgressRoutes />}
        />
        <Route path="finished/*" element={<FinishedRoutes />} />
      </Route>
      <Route path="logout" element={<LogOut />} />
    </>
  )
);

const url = new URL(window.location.href);
const params = new URLSearchParams(url.search);
const portalCode = params.get("portal");

function App() {
  const { portalData, hasError: portalError } = usePortalData();
  const { businessManagersData, hasError: businessError } = useBusinessManagers(
    portalData,
    portalCode
  );
  const {
    hasError: authError,
    isLoading,
    isAuthenticated,
  } = useAuthRedirect(portalData, businessManagersData, portalCode);

  const hasError = portalError || businessError || authError;

  if (isLoading) {
    return null;
  }

  if (hasError && !isAuthenticated) {
    return <ErrorPage />;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <GlobalStyles />
      <ThemeProvider theme={theme}>
        <FlagProvider>
          <AppContextProvider>
            <RouterProvider router={router} />
          </AppContextProvider>
        </FlagProvider>
      </ThemeProvider>
    </>
  );
}

export default App;