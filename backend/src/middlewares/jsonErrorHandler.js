const jsonErrorHandler = (err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    // JSON parsing error
    res.status(400).json({ message: 'Bad JSON' });
  } else {
    // Other errors
    next();
  }
};

export default jsonErrorHandler;
