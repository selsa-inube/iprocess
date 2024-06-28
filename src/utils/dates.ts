const formatPrimaryDate = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "UTC",
  };
  new Date(date)
  return date.toLocaleDateString("en-US", options);
};

export { formatPrimaryDate };
