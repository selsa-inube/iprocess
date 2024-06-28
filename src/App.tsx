import { useEffect } from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import { useAuth0 } from "@auth0/auth0-react";
import { ErrorPage } from "@components/layout/ErrorPage";
import AppContextProvider from "@context/AppContext";

import { AppPage } from "./components/layout/AppPage";
import { enviroment } from "./config/environment";
import { GlobalStyles } from "./styles/global";
import { ConfirmInitiatedRoutes } from "./routes/confirmInitiated";
import { FinishedRoutes } from "./routes/finished";
import { StartProcessRoutes } from "./routes/startProcess";
import { ValidateProgressRoutes } from "./routes/validateProgress";

function LogOut() {
  localStorage.clear();
  const { logout } = useAuth0();
  logout({ logoutParams: { returnTo: enviroment.REDIRECT_URI } });
  return <AppPage />;
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route errorElement={<ErrorPage />} />
      <Route path="/*" element={<AppPage />}>
        <Route path="/*" element={<StartProcessRoutes />} />
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

function App() {
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      loginWithRedirect();
    }
  }, [isLoading, isAuthenticated, loginWithRedirect]);

  if (!isAuthenticated) {
    return null;
  }
  return (
    <AppContextProvider>
      <GlobalStyles />
      <RouterProvider router={router} />
    </AppContextProvider>
  );
}

export default App;
