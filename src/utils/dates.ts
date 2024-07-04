import { capitalizeText } from "./texts";

const formatPrimaryDate = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "UTC",
  };
  new Date(date);
  return date.toLocaleDateString("en-US", options);
};

const formatDate = (date: Date, withTime?: boolean) => {
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  };
  const dateString = date.toLocaleDateString("es-ES", options);

  const [day, month, year] = dateString.split(" ");

  let formattedDate = `${day}/${capitalizeText(month)}/${year}`;

  if (withTime) {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const formatMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formatSeconds = seconds < 10 ? `0${seconds}` : seconds;

    const timeString = `${hours}:${formatMinutes}:${formatSeconds}`;

    formattedDate += ` ${timeString}`;
  }

  return formattedDate;
};

export { formatPrimaryDate, formatDate };
