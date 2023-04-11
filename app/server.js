const { log } = require("console");
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const { allRoutes } = require("./router/router");
module.exports = class Application {
  #app = express();
  #PORT;
  #DB_URI;
  constructor(PORT, DB_URI) {
    this.#PORT = PORT;
    this.#DB_URI = DB_URI
    this.configApplication();
    this.connectToDB();
    this.createServer();
    this.createRoute();
    this.errorHandler();
  }
  configApplication() {
    this.#app.use(express.json());
    this.#app.use(express.urlencoded({ extended: true }));
    this.#app.use(express.static(path.join(__dirname, "..", "public")));
  }
  connectToDB() {
    mongoose.connect(this.#DB_URI)
  }
  createServer() {
    try {
      const http = require("http");
      http.createServer(this.#app ).listen(this.#PORT, () => {
        console.log(`http://localhost:${this.#PORT}`);
      });
    } catch (error) {
      console.log(error)
    }
  }
  createRoute() {
    this.#app.use(allRoutes)
  }
  errorHandler() {
    this.#app.use((req, res, next) => {
      res.status(404).json({
        statusCode: 404,
        msg: "Page Not Found",
      });
    });
    this.#app.use((error, req, res, next) => {
      const statusCode = error.status || 500;
      const msg = error.message || "Internal error";
      return res.status(statusCode).json({
        statusCode,
        msg,
      });
    });
  }
};
