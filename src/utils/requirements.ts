import { evaluationStatusRequirement, statusRequirement } from "./requirementsStatus";


const executionStatusByPerson =[
  { status: "WithoutProcessing", name: "Sin procesar", appearance: "warning" },
  { status: "ProcessedWithErrors", name: "Error", appearance: "danger" },
]

const filteredExecutionStatusByPerson = ["ProcessedWithErrors"];

enum RequirementTypeNormalize  {
  SYSTEM_VALIDATION= "Validación del sistema",
  DOCUMENT= "Documento",
  HUMAN_VALIDATION= "Validación humana",
};

const normalizeStatusRequirementByStatus = (requirement: string) =>
  statusRequirement.find((element) => element.status === requirement);

const normalizeStatusRequirementByName = (requirement: string) =>
  statusRequirement.find((element) => element.name === requirement);

const normalizeEvalStatusRequirementByStatus = (requirement: string) =>
  evaluationStatusRequirement.find((element) => element.status === requirement);

const normalizeEvalStatusRequirementByName = (requirement: string) =>
  evaluationStatusRequirement.find((element) => element.name === requirement);

const normalizeexecutionStatusByPerson = (requirement: string) =>
  executionStatusByPerson.find((element) => element.status === requirement);


export {
  filteredExecutionStatusByPerson, 
  RequirementTypeNormalize,
  normalizeStatusRequirementByStatus,
  normalizeStatusRequirementByName,
  normalizeEvalStatusRequirementByStatus,
  normalizeEvalStatusRequirementByName,
  normalizeexecutionStatusByPerson,
};
