import { MdCancel, MdCheckCircle, MdDoDisturbOn } from 'react-icons/md';

const statusRequirement = [
  { status: "Meets", name: "Cumple", appearance: "success", icon: <MdCheckCircle /> },
  { status: "NotMeets", name: "No Cumple", appearance: "danger", icon: <MdCancel />},
  { status: "NoMeets", name: "No Cumple", appearance: "danger", icon: <MdCancel /> },
  { status: "NoEvaluated", name: "Sin Evaluar", appearance: "warning", icon: <MdDoDisturbOn /> },
  { status: "Undefined", name: "No Definido", appearance: "gray", icon: <MdCheckCircle />},
  { status: "WithoutProcessing", name: "Sin procesar", appearance: "warning" , icon: <MdDoDisturbOn />},
  { status: "ProcessedWithErrors", name: "Error", appearance: "danger", icon: <MdCancel /> },
];

export { statusRequirement };