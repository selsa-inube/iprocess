import { INav } from "@components/layout/AppPage/types";
import { ICardData } from "@pages/home/types";
import {
  MdLogout,
  MdOutlineCheck,
  MdOutlineMoving,
  MdOutlineStart,
  MdOutlineThumbUp,
} from "react-icons/md";
import { OptionsNav } from "./optionsNav";

const getOptionByPublicCode = (optionsCards: ICardData[], publicCode: string) =>
  optionsCards.find((option) => option.id === publicCode);

const optionNav = (option: ICardData | undefined, defaultIcon: JSX.Element) => ({
  id: option?.id || "",
  label: option?.label || "",
  icon: option?.icon || defaultIcon,
  path: option?.url || "",
});

const navConfig = (optionsCards: ICardData[]): INav => {
  const startProcess = getOptionByPublicCode(optionsCards, OptionsNav[0]);
  const confirmInitiated = getOptionByPublicCode(optionsCards, OptionsNav[1]);
  const validateProgress = getOptionByPublicCode(optionsCards, OptionsNav[2]);
  const finished = getOptionByPublicCode(optionsCards, OptionsNav[3]);

  return {
    title: "MENU",
    sections: {
      administrate: {
        name: "",
        links: {
          startProcess: optionNav(startProcess, <MdOutlineStart />),
          confirmInitiated: optionNav(confirmInitiated, <MdOutlineThumbUp />),
          validateProgress: optionNav(validateProgress, <MdOutlineMoving />),
          finished: optionNav(finished, <MdOutlineCheck />),
        },
      },
    },
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

export { userMenu, navConfig };