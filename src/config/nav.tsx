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

const navConfig = (optionsCards: ICardData[]) => {
  const getOptionByPublicCode = (publicCode: string) =>
    optionsCards.find((option) => option.id === publicCode);

  const startProcess = getOptionByPublicCode(OptionsNav[0]);
  const confirmInitiated = getOptionByPublicCode(OptionsNav[1]);
  const validateProgress = getOptionByPublicCode(OptionsNav[2]);
  const finished = getOptionByPublicCode(OptionsNav[3]);

  const nav: INav = {
    title: "MENU",
    sections: {
      administrate: {
        name: "",
        links: {
          startProcess: {
            id: startProcess?.id || "",
            label: startProcess?.label || "",
            icon: startProcess?.icon || <MdOutlineStart />,
            path: startProcess?.url || "",
          },
          confirmInitiated: {
            id: confirmInitiated?.id || "",
            label: confirmInitiated?.label || "",
            icon: confirmInitiated?.icon || <MdOutlineThumbUp />,
            path: confirmInitiated?.url || "",
          },
          validateProgress: {
            id: validateProgress?.id || "",
            label: validateProgress?.label || "",
            icon: validateProgress?.icon || <MdOutlineMoving />,
            path: validateProgress?.url || "",
          },
          finished: {
            id: finished?.id || "",
            label: finished?.label || "",
            icon: finished?.icon || <MdOutlineCheck />,
            path: finished?.url || "",
          },
        },
      },
    },
  };

  return nav;
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
