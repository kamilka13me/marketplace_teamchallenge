interface NumbersMap {
  [key: string]: number;
}

export const totalRatingCountHelper = (dataForCalc: NumbersMap) => {
  const totalCountOfRatings = Object.values(dataForCalc).reduce(
    (acc, cur) => acc + cur,
    0,
  );

  return totalCountOfRatings;
};

export const calcRatingInPercentage = (dataForCalc: NumbersMap) => {
  const inPercentages: NumbersMap = {};
  const totalCount = totalRatingCountHelper(dataForCalc);

  Object.keys(dataForCalc).forEach((key) => {
    inPercentages[key] = ((dataForCalc[key] || 0) / totalCount) * 100;
  });

  return inPercentages;
};

export const calcAverage = (dataForCalc: NumbersMap) => {
  let sum = 0;
  const totalCount = totalRatingCountHelper(dataForCalc);

  Object.keys(dataForCalc).forEach((key) => {
    sum += parseInt(key, 10) * (dataForCalc[key] || 0);
  });

  return Number.isNaN(sum / totalCount) ? 0 : sum / totalCount;
};
