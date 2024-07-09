import { CustomError } from './customError.js';

const parseSpecifications = (specifications) => {
  try {
    let newSpecifications = specifications;

    if (typeof specifications === 'string') {
      newSpecifications = specifications.trim();
      if (!newSpecifications.startsWith('[') || !newSpecifications.endsWith(']')) {
        newSpecifications = `[${newSpecifications}]`;
      }
    }

    return JSON.parse(newSpecifications);
  } catch (error) {
    console.log(error);
    throw new CustomError('Parse Specification error');
  }
};

export default parseSpecifications;
