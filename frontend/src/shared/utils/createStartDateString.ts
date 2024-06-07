export const createStartDateString = (date: Date) =>
  `${date.toISOString().slice(0, 10)}T00:00:00.000Z`;
