const data = {
  id: "10",
  description:
    "Los NFTs son tokens no fungibles únicos en la cadena de bloques",
  formOfExecution: "Los tokens únicos en la cadena de bloques.",
  error:
    "Los NFTs son tokens no fungibles únicos en la cadena de bloques",
  executionDate: "31/DIC/2024",
  time: 20,
};

const labels = [
  {
    id: "aplication",
    titleName: "Aplicación",
  },
  {
    id: "description",
    titleName: "Descripción",
    priority: 1,
  },
  {
    id: "formOfExecution",
    titleName: "Forma de ejecución",
  },
  {
    id: "error",
    titleName: "Error",
  },
  {
    id: "executionDate",
    titleName: "Fecha planeada de ejecución",
  },
  {
    id: "time",
    titleName: "Tiempo(minutos) de deducción de personas a procesar.",
  },
];

const titlesTable = [
  {
    id: "parameter",
    titleName: "Parámetro",
    priority: 0,
  },
  {
    id: "value",
    titleName: "Valor",
    priority: 0,
  },
];

const dataTable = [
  {
    id: "1",
    parameter: "Parámetro 1",
    value: "Valor",
  },
  {
    id: "2",
    parameter: "Parámetro 2",
    value: "Valor",
  },
  {
    id: "3",
    parameter: "Parámetro 3",
    value: "Valor",
  },
];

const breakPointsTable = [
  { breakpoint: "(min-width: 1091px)", totalColumns: 2 },
];

export { data, labels, titlesTable, dataTable, breakPointsTable };
