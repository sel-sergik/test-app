export const isEmpty = (obj: object) => Object.keys(obj).length === 0;

const addExtraZero = (value: number) => value <= 9 ? '0' + value : value;

export const formatTime = (originalDate: Date) => {
  const day = addExtraZero(originalDate.getDate());
  const month = addExtraZero(originalDate.getMonth() + 1);
  const year = originalDate.getFullYear();
  const hours = addExtraZero(originalDate.getHours());
  const minutes = addExtraZero(originalDate.getMinutes());
  const seconds = addExtraZero(originalDate.getSeconds());

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
}