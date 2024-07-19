import { IConfirmInitiated } from "./types";

const orderDateConfirmInitialted = (data: IConfirmInitiated[], orderAscending: boolean) => {
    orderAscending
      ? data.sort((b, a) => a.executionDate.getTime() - b.executionDate.getTime())
      : data.sort(
          (a, b) => a.executionDate.getTime() - b.executionDate.getTime()
        );
  };

  export { orderDateConfirmInitialted };