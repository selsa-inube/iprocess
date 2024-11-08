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

const evaluationStatusRequirement = [
  {
    status: "ERROR_IN_EVALUATION",
    name: "Error en evaluación",
    appearance: "danger",
    icon: <MdCancel />
  },
  { status: "UNVALIDATED", name: "No Valido", appearance: "danger" },
  {
    status: "PASSED_WITH_SYSTEM_VALIDATION",
    name: "Validación sistema cumplida",
    appearance: "success",
    icon: <MdCheckCircle />
  },
  {
    status: "PASSED_WITH_HUMAN_VALIDATION",
    name: "Validación humana cumplida",
    appearance: "success",
    icon: <MdCheckCircle />
  },
  {
    status: "FAILED_SYSTEM_VALIDATION",
    name: "Validacion del sistema NO cumplida",
    appearance: "warning",
    icon: <MdDoDisturbOn />
  },
  {
    status: "DOCUMENT_NOT_LOADED",
    name: "Documento NO cargado",
    appearance: "danger",
    icon: <MdCancel />
  },
  {
    status: "DOCUMENT_STORED_WITHOUT_VALIDATION",
    name: "Documento almacenado sin validación",
    appearance: "warning",
    icon: <MdDoDisturbOn />
  },
  {
    status: "DOCUMENT_STORED_AND_VALIDATED",
    name: "Documento almacenado y cargado",
    appearance: "success",
    icon: <MdCheckCircle />
  },
  {
    status: "IGNORED_BY_THE_USER",
    name: "Ignorado por el usuario",
    appearance: "success",
    icon: <MdCheckCircle />
  },
  
];

export { statusRequirement, evaluationStatusRequirement };