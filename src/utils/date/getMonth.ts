export const getMonth = (date: string) => {
  const currentMonth = new Date(date).toLocaleString("ru", {
    month: "long",
  });
  const upperCaseMonth = currentMonth.charAt(0).toUpperCase() + currentMonth.slice(1);
  return upperCaseMonth;
};