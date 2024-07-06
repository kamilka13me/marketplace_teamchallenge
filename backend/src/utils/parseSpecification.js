import { CustomError } from './customError.js';

const parseSpecifications = (specifications) => {
  try {
    let newSpecifications;

    if (!specifications.trim().startsWith('[') || !specifications.trim().endsWith(']')) {
      newSpecifications = `[${specifications}]`;
    }

    return JSON.parse(newSpecifications);
  } catch (error) {
    throw new CustomError('Parse Specification error');
  }
};

export default parseSpecifications;
