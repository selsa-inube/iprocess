import { appCards } from "@config/appCards";
import { HomeUI } from "./interface";

function Home() {
  return <HomeUI data={appCards} />;
}

export { Home };
