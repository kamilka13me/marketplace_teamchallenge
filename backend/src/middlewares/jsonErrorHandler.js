const jsonErrorHandler = (err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    // Помилка парсингу JSON
    res.status(400).json({ message: 'Bad JSON' });
  } else {
    // Інші помилки
    next();
  }
};

export default jsonErrorHandler;
