interface NumbersMap {
  [key: string]: number;
}

export const totalRatingCountHelper = (dataForCalc: NumbersMap) => {
  if (dataForCalc !== null && dataForCalc !== undefined) {
    return Object.values(dataForCalc).reduce((acc, cur) => acc + cur, 0);
  }

  return 0;
};

export const calcRatingInPercentage = (dataForCalc: NumbersMap) => {
  if (dataForCalc !== null && dataForCalc !== undefined) {
    const inPercentages: NumbersMap = {};
    const totalCount = totalRatingCountHelper(dataForCalc);

    Object.keys(dataForCalc).forEach((key) => {
      inPercentages[key] = ((dataForCalc[key] || 0) / totalCount) * 100;
    });

    return inPercentages;
  }

  return 0;
};

export const calcAverage = (dataForCalc: NumbersMap) => {
  if (dataForCalc !== null && dataForCalc !== undefined) {
    let sum = 0;
    const totalCount = totalRatingCountHelper(dataForCalc);

    Object.keys(dataForCalc).forEach((key) => {
      sum += parseInt(key, 10) * (dataForCalc[key] || 0);
    });

    return Number.isNaN(sum / totalCount) ? 0 : sum / totalCount;
  }

  return 0;
};
