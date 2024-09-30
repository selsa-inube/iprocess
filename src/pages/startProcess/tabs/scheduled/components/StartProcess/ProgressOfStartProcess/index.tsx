import { useEffect, useState } from "react";

import { ProgressCardWithBarDetermined } from "@components/feedback/ProgressCardWithBarDetermined";
import { timeToCompleteProcess } from "@services/startProcess/getTimeToCompleteProcess";
import { ProgressCardWithBarIndetermined } from "@components/feedback/ProgressCardWithBarIndetermined";
import { calculateSeconds, stringToTime } from "@pages/startProcess/utils";

interface ProgressOfStartProcessProps {
  id: string;
  handleShowProgressModal: (showModal: boolean) => void;
  dateStart: Date;
}

const calculatePercentage = (
  currentMoment: number,
  time: number,
  dateStart: Date
) => {
  const secondsElapsed = currentMoment - calculateSeconds(dateStart);
  const secondsValid = secondsElapsed >= 0 ? secondsElapsed : 0;
  return (secondsValid / time) * 100;
};

const percentageElapsed = (
  time: number,
  percentageDos: number,
  dateStart: Date
): number => {
  if (percentageDos >= 100) {
    return percentageDos;
  }

  const dateCurrent = new Date();
  const currentMoment = calculateSeconds(dateCurrent);
  const percentageResp = calculatePercentage(currentMoment, time, dateStart);

  if (percentageResp >= 100) {
    return 100;
  }
  return percentageResp;
};

const ProgressOfStartProcess = (props: ProgressOfStartProcessProps) => {
  const { id, dateStart } = props;
  const [percentage, setPercentage] = useState(0);
  const [processTime, setProcessTime] = useState<number | undefined>();
  const [time, setTime] = useState<Date | undefined>();

  const validateTimeToCompleteProcess = async (progressCatalogId: string) => {
    try {
      const newTime = await timeToCompleteProcess(progressCatalogId);
      setProcessTime(newTime.secondsTime);
    } catch (error) {
      console.info(error);
    }
  };

  useEffect(() => {
    validateTimeToCompleteProcess(id);
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      const message = "¿Estás seguro de que quieres salir?";
      event.returnValue = message;
      return message;
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [id]);

  useEffect(() => {
    if (processTime) {
      setTime(stringToTime(processTime));
    }
  }, [processTime]);

  const timeSeconds = time ? calculateSeconds(time as Date) : 0;

  useEffect(() => {
    const timer = setInterval(() => {
      const newPercentage = percentageElapsed(
        timeSeconds,
        percentage,
        dateStart
      );

      if (newPercentage >= 100) {
        clearInterval(timer);
        setPercentage(100);
      } else {
        setPercentage(newPercentage);
      }
    }, 300);
    return () => clearInterval(timer);
  }, [percentage, timeSeconds, dateStart]);

  return (
    <>
      {!time ? (
        <ProgressCardWithBarIndetermined portalId="portal" />
      ) : (
        <ProgressCardWithBarDetermined
          estime={timeSeconds}
          progress={percentage}
          portalId="portal"
          isAnimated={percentage === 100 ? false : true}
        />
      )}
    </>
  );
};

export default ProgressOfStartProcess;
