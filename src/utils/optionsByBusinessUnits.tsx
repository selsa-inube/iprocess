import {
  MdOutlineCheck,
  MdOutlineMoving,
  MdOutlineStart,
  MdOutlineThumbUp,
} from "react-icons/md";

const options = [
  {
    publicCode: "iniciarprocesos",
    icon: <MdOutlineStart />,
    url: "/start-process",
  },
  {
    publicCode: "confirmariniciados",
    icon: <MdOutlineThumbUp />,
    url: "/confirm-initiated",
  },
  {
    publicCode: "validarprogreso",
    icon: <MdOutlineMoving />,
    url: "/validate-progress",
  },
  { publicCode: "finalizados", icon: <MdOutlineCheck />, url: "/finished" },
];

const normalizeOptionsByPublicCode = (publicCode: string) =>
  options.find((data) => data.publicCode === publicCode);


export { options, normalizeOptionsByPublicCode };
