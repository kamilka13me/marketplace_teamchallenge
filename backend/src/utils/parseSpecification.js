const parseSpecifications = (specifications) => {
  try {
    let newSpecifications;

    if (!specifications.trim().startsWith('[') || !specifications.trim().endsWith(']')) {
      newSpecifications = `[${specifications}]`;
    }

    return JSON.parse(newSpecifications);
  } catch (error) {
    throw new Error('Invalid request body in specifications');
  }
};

export default parseSpecifications;
