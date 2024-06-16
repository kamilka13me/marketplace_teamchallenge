import { StatisticDataItem } from '../../Analytics/interfaces/StatisticData';

export const generateMonthlyData = (startDate: Date, endDate: Date) => {
  const result = [];
  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    const dateString = currentDate.toISOString().split('T')[0]!;

    result.push({ date: dateString, count: 0 });
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return result;
};

export const mergeDailyData = (
  arr1: StatisticDataItem[],
  arr2: StatisticDataItem[],
): StatisticDataItem[] => {
  const result: { [key: string]: number } = {};

  arr1.forEach((item) => {
    result[item.date] = (result[item.date] || 0) + item.count;
  });

  arr2.forEach((item) => {
    result[item.date] = (result[item.date] || 0) + item.count;
  });

  return Object.keys(result).map((date) => ({
    date,
    count: result[date]!,
  }));
};

export const getStartOfMonth = () => {
  const startOfMonth = new Date();

  startOfMonth.setDate(1);
  startOfMonth.setHours(3, 0, 0, 0);

  return startOfMonth;
};

export const getEndOfMonth = () => {
  const endOfMonth = new Date();

  endOfMonth.setMonth(endOfMonth.getMonth() + 1);
  endOfMonth.setDate(0);
  endOfMonth.setHours(23, 59, 59, 999);

  return endOfMonth;
};
