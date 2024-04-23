import { SellerRatingResponse } from '@/features/managingFeedbacks/ui/ManagingFeedbacks';

interface NumbersMap {
  [key: string]: number;
}

export const totalRatingCountHelper = (dataForCalc: SellerRatingResponse) => {
  const totalCountOfRatings = Object.values(dataForCalc.current).reduce(
    (acc, cur) => acc + cur,
    0,
  );

  return totalCountOfRatings;
};

export const calcRatingInPercentage = (dataForCalc: SellerRatingResponse) => {
  const inPercentages: NumbersMap = {};
  const totalCount = totalRatingCountHelper(dataForCalc);

  Object.keys(dataForCalc.current).forEach((key) => {
    inPercentages[key] = ((dataForCalc.current[key] || 0) / totalCount) * 100;
  });

  return inPercentages;
};

export const calcAverage = (dataForCalc: SellerRatingResponse) => {
  let sum = 0;
  const totalCount = totalRatingCountHelper(dataForCalc);

  Object.keys(dataForCalc.current).forEach((key) => {
    sum += parseInt(key, 10) * (dataForCalc.current[key] || 0);
  });

  return sum / totalCount;
};
