const express = require("express");

const app = express();

app.use(express.json());


process.on("unhandledRejection", (err) => {
    console.error("Unhandled Rejection:", err);
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
});

const authRoutes = require("./routes/auth.route");
const orderRoutes = require("./routes/order.route");
const productRoutes = require("./routes/product.route");
const errorHandler = require("./middlewares/error.middleware");

app.use(errorHandler);
app.use("/auth", authRoutes);
app.use("/orders", orderRoutes);
app.use("/products", productRoutes);




app.get("/", (req, res) => {
  res.send("Backend Running 🚀");
});

module.exports = app;
