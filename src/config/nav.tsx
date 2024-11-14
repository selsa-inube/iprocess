import { INav } from "@components/layout/AppPage/types";
import {
  MdLogout,
  MdOutlineCheck,
  MdOutlineMoving,
  MdOutlineStart,
  MdOutlineThumbUp,

} from "react-icons/md";
import { enviroment } from "./environment";

const nav: INav = {
  title: "MENU",
  sections: {
    administrate: {
      name: "",
      links: {
        startProcess: {
          id: "startProcess",
          label: "Iniciar procesos",
          icon: <MdOutlineStart />,
          path:"/start-process",
        },
        confirmInitiated: {
          id: "confirmInitiated",
          label: "Confirmar iniciados",
          icon: <MdOutlineThumbUp />,
          path: "/confirm-initiated",
        },
        validateProgress: {
          id: "validateProgress",
          label: "Validar progreso",
          icon: <MdOutlineMoving />,
          path: "/validate-progress",
        },
        finished: {
          id: "finished",
          label: "Finalizados",
          icon: <MdOutlineCheck />,
          path: "/finished",
        },
      },
    },
  },
};

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

export { nav, userMenu, actionsConfig };
