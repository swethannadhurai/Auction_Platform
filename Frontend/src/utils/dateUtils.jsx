// dateUtils.js
export const formatDateTimeLocal = (isoString) => {
  const date = new Date(isoString);
  const offset = date.getTimezoneOffset();
  const localDate = new Date(date.getTime() - offset * 60 * 1000);
  return localDate.toISOString().slice(0, 16); // "yyyy-MM-ddThh:mm"
};
