export const formatDate = (input) => {
  const dateTime = new Date(input);
  const monthValue = dateTime.getMonth() + 1;
  const dateValue = dateTime.getDate();

  return `${dateTime.getFullYear()}-${
    monthValue < 10 ? '0' : ''
  }${monthValue}-${dateValue < 10 ? '0' : ''}${dateValue}`;
};
