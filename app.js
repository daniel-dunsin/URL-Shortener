// imports
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const xss = require("xss-clean");
const bodyParser = require("body-parser");
const indexController = require("./controllers/index");
const urlRoute = require("./routes/url");

// initialize app
const app = express();

// middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(helmet());
app.use(xss());

// routes
app.get("/:id", indexController);
app.use("/url", urlRoute);

// Not Found
app.all("*", (req, res, next) => {
  res.status(404).send({
    message: "Resource not found",
  });
});

// Error handler
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).send({
    message: err.message || "Internal Server error occured",
  });
});

// connection
const port = process.env.PORT || 3001;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(port, () => {
      console.log("Server is listening on port " + port);
    });
  })
  .catch((error) => {
    console.log(error);
    process.exit();
  });
