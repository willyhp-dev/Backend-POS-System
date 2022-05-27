var createError = require("http-errors");
var express = require("express");
var app = express();
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const Router = require("./app/Product/router");
const CategoryRouter = require("./app/category/router");
const TagRouter = require("./app/tag/router");
const authRouter = require("./app/auth/router");
const addressRouter = require("./app/DeliveryAddress/router");
const cardRouter = require("./app/Cart/router");
const OrderRouter = require("./app/Order/router");
const InvoiceRouter = require("./app/Invoice/router");
const PaymentRouter = require("./app/payment/router");
const { decodeToken } = require("./middlewares");
const db = require("./database/index");

const cors = require("cors");
// view engine setup
app.use(express.json());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(cors());
app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(decodeToken());
app.use("/api/auth", authRouter);
app.use("/api",Router);
app.use("/api",CategoryRouter);
app.use("/api",TagRouter);
app.use("/api",addressRouter);
app.use("/api",cardRouter);
app.use("/api",OrderRouter);
app.use("/api", InvoiceRouter);
app.use("/api",PaymentRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});
app.listen(4000, console.log("Server is Running"));

module.exports = app;
