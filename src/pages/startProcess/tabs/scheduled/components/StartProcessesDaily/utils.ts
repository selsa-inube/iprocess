import { IDailyDetail } from "@pages/startProcess/types";

const orderData = (data: IDailyDetail[], orderAscending: boolean) => {
  if (!data) return;

  data.sort((a, b) => {
    const dateA = new Date(a.estimatedExecutionDate);
    const dateB = new Date(b.estimatedExecutionDate);

    return orderAscending
      ? dateA.getTime() - dateB.getTime()
      : dateB.getTime() - dateA.getTime();
  });
};

export { orderData };