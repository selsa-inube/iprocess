const calculateSeconds = (dateProcess: Date) => {
  return (
    dateProcess.getHours() * 3600 +
    dateProcess.getMinutes() * 60 +
    dateProcess.getSeconds()
  );
};
const dateStart = new Date();
const dateEnd = new Date(); 
dateEnd.setSeconds(dateEnd.getSeconds() + 30);
const secondStart = calculateSeconds(dateStart);
const secondEnd = calculateSeconds(dateEnd);
export const totalSeconds = secondEnd - secondStart;

const calculatePercentage = (currentMoment: number) => {
  const secondsElapsed = currentMoment - secondStart;
  const secondsValid = secondsElapsed >= 0 ? secondsElapsed : 0;
  const percentage = (secondsValid / totalSeconds) * 100;
  return percentage;
};

export const percentageElapsed = () => {
  const dateCurrent = new Date();
  const currentMoment = calculateSeconds(dateCurrent);
  const percentage = calculatePercentage(currentMoment);
  return percentage;
};




