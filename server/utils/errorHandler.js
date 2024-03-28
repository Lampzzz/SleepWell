const errorHandler = (res, error) => {
  res.status(500).json({ errorMessage: error.message });
};

export default errorHandler;
