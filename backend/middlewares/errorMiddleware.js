const errorMiddleware = (err, req, res, next) => {
  const { statusCode, message } = err;
  console.log("Error status: ", statusCode);
  console.log("Message: ", message);

  res.status(statusCode || 500);
  res.json({
    statusCode,
    message,
  });
};

module.exports = {
  errorMiddleware,
};
