import {
    MdOutlineRemoveRedEye,
    MdPinInvoke,
    MdImportExport,
  } from "react-icons/md";
  import { Icon } from "@inubekit/icon";
  import { Text } from "@inubekit/text";
  import { SkeletonLine } from "@inubekit/skeleton";
  
  import { ITitle } from "@components/data/Table/props";
  import { StyledContainerTitle } from "@components/data/Table/stories/styles";
  import { ValidateProgresses } from "@pages/validateProgress/types";
  import { formatDate } from "@utils/dates";
  
  const scheduledNormailzeEntries = (process: ValidateProgresses[]) =>
    process.map((entry) => ({
      ...entry,
      id: `${entry.id}${entry.executionDate}`,
      process: entry.businessUnit,
      executionDate: entry.executionDate && formatDate(entry.executionDate),
      requirements: <SkeletonLine animated />,
    }));
  
  const titlesConfig = (handleOrderData: () => void) => {
    const titles: ITitle[] = [
      {
        id: "process",
        titleName: "Proceso",
        priority: 0,
      },
      {
        id: "executionDate",
        titleName: (
          <StyledContainerTitle>
            <Text type="title" size="small" appearance="dark" textAlign="start" weight="bold" >
              Fecha de ejecución
            </Text>
  
            <Icon
              appearance="dark"
              icon={<MdImportExport />}
              size="16px"
              onClick={() => handleOrderData()}
              cursorHover
            />
          </StyledContainerTitle>
        ),
        priority: 1,
      },
      {
        id: "state",
        titleName: "Estado",
        priority: 2,
      },
    ];
  
    return titles;
  };
  
  const actions = [
    {
      id: "Details",
      actionName: "Detalles",
      content: () => (
        <Icon
          appearance="gray"
          icon={<MdOutlineRemoveRedEye />}
          size="16px"
          cursorHover={true}
        />
      ),
    },
    {
      id: "Options",
      actionName: "",
      content: () => (
        <Icon
          appearance="gray"
          icon={<MdPinInvoke />}
          size="16px"
          cursorHover={true}
        />
      ),
    },
  ];
  
  const breakPoints = [{ breakpoint: "(min-width: 1091px)", totalColumns: 3 }];
  
  export { titlesConfig, actions, breakPoints, scheduledNormailzeEntries };
  