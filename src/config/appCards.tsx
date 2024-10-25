import { MdOutlineCheck, MdOutlineMoving, MdOutlineStart, MdOutlineThumbUp } from "react-icons/md";
import { ICardData } from "@pages/home/types";


const appCards: ICardData[] = [
  {
    id: "startProcess",
    label: "Iniciar procesos",
    description: "Inicializa los procesos.",
    icon: <MdOutlineStart />,
    url: "/start-process",
  },
  {
    id: "confirmInitiated",
    label: "Confirmar iniciados",
    description: "Confirma los proceso iniciados.",
    icon: <MdOutlineThumbUp />,
    url: "/confirm-initiated",
  },
  {
    id: "validateProgress",
    label: "Validar progreso",
    description: "Valida el progreso de los procesos.",
    icon: <MdOutlineMoving />,
    url: "/validate-progress",
  },
  {
    id: "finished",
    label: "Finalizados",
    description: "Visualiza los procesos que estan finalizados.",
    icon: <MdOutlineCheck />,
    url: "/finished",
  },  

];

export { appCards };
