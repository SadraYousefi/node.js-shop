const { log } = require("console");
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const { allRoutes } = require("./router/router");
const morgan = require("morgan");
const { create } = require("domain");
const createHttpError = require("http-errors");
module.exports = class Application {
  #app = express();
  #PORT;
  #DB_URI;
  constructor(PORT, DB_URI) {
    this.#PORT = PORT;
    this.#DB_URI = DB_URI;
    this.configApplication();
    this.connectToDB();
    this.createServer();
    this.createRoute();
    this.errorHandler();
  }
  configApplication() {
    this.#app.use(morgan("dev"));
    this.#app.use(express.json());
    this.#app.use(express.urlencoded({ extended: true }));
    this.#app.use(express.static(path.join(__dirname, "..", "public")));
  }
  connectToDB() {
    mongoose.connect(this.#DB_URI);
    mongoose.connection.on("connected", () => {
      console.log("Mongoose connected to DB");
    });
    mongoose.connection.on("disconnected ", () => {
      console.log("mongoose disconnected");
    });
    process.on("SIGINT", async () => {
      await mongoose.connection.close();
      process.exit(0);
    });
  }
  createServer() {
    try {
      const http = require("http");
      http.createServer(this.#app).listen(this.#PORT, () => {
        console.log(`Server is running on : http://localhost:${this.#PORT}`);
      });
    } catch (error) {
      console.log(error);
    }
  }
  createRoute() {
    this.#app.use(allRoutes);
  }
  errorHandler() {
    this.#app.use((req, res, next) => {
      next(createHttpError.NotFound("Page not found"));
    });
    this.#app.use((error, req, res, next) => {
      const serverError = createHttpError.InternalServerError()
      const statusCode = error.status || serverError.statusCode;
      const msg = error.message || serverError.message;
      return res.status(statusCode).json({
        errros: {
          statusCode,
          msg,
        },
      });
    });
  }
};
