export const createEndDateString = (date: Date) =>
  `${date.toISOString().slice(0, 10)}T23:59:59.999Z`;
