function errorHandler(err, req, res, next) {
  console.error("🔥 Error:", err.message);

  res.status(400).json({
    error: err.message || "Something went wrong",
  });
}

module.exports = errorHandler;