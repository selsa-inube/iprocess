import { INav } from "@components/layout/AppPage/types";
import { ICardData } from "@pages/home/types";
import {
  MdLogout,
  MdOutlineStart,
} from "react-icons/md";
import { enviroment } from "./environment";

const createNavLink = (option: ICardData | undefined, defaultIcon: JSX.Element) => ({
  id: option?.id || "",
  label: option?.label || "",
  icon: option?.icon || defaultIcon,
  path: option?.url || "",
});

const navConfig = (optionsCards: ICardData[]): INav => {
  const linkNav = optionsCards.reduce<Record<string, ReturnType<typeof createNavLink>>>((acc, option) => {
    const navLink = createNavLink(option, <MdOutlineStart />);
    acc[navLink.id] = navLink;
    return acc;
  }, {});

  return {
    items: {
    title: "MENU",
    sections: {
      administrate: {
        name: "",
        links: linkNav,
      },
    },
  },
  breakpoint: "848px",
  };
};

const userMenu = [
  {
    id: "section",
    title: "",
    links: [
      {
        id: "logout",
        title: "Cerrar sesión",
        path: "/logout",
        iconBefore: <MdLogout />,
      },
    ],
    divider: true,
  },
];

const actionsConfig = (logout: () => void) => {
  const actions =[{
     id: "logout",
     label: "Cerrar sesión",
     icon: <MdLogout />,
     action: () => {
       logout();
       window.location.href = enviroment.REDIRECT_URI;
     },
   }]
 
   return actions
 };

export { userMenu, navConfig, actionsConfig };