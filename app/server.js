const { log } = require("console");
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const { allRoutes } = require("./router/router");
const morgan = require("morgan");
const { create } = require("domain");
const createHttpError = require("http-errors");
const swaggerUI = require("swagger-ui-express");
require("dotenv").config()
const swaggerJsDoc = require("swagger-jsdoc");
const cors = require("cors")
module.exports = class Application {
  #app = express();
  #PORT;
  #DB_URI;
  constructor(PORT, DB_URI) {
    this.#PORT = PORT || 3000;
    this.#DB_URI = DB_URI || 'mongodb+srv://sadredinyousefi:13781999@myapp.oywtoen.mongodb.net/?retryWrites=true&w=majority';
    this.configApplication();
    this.connectToDB();
    this.initRedis();
    this.createServer();
    this.createRoute();
    this.errorHandler();
  }
  configApplication() {
    this.#app.use(cors())
    this.#app.use(morgan("dev"));
    this.#app.use(express.json());
    this.#app.use(express.urlencoded({ extended: true }));
    this.#app.use(express.static(path.join(__dirname, "..", "public")));
    this.#app.use(
      "/api-doc",
      swaggerUI.serve,
      swaggerUI.setup(
        swaggerJsDoc({
          swaggerDefinition: {
            openapi : "3.0.0" , 
            info: {
              title: "Simple Node.js shop",
              version: "1.0.0",
              description: "Way to sell your stuff",
            },
            servers: [
              {
                url: "http://localhost:3000",
              },
            ],
            components : {
              securitySchemes : {
                BearerAuthentication : {
                  type : 'http' ,
                  scheme : 'bearer' ,
                  bearerFormat : "JWT" ,

                }
              }
            } ,
            security : [{BearerAuthentication : []}]
          },
          apis: ["./app/router/**/*.js"],
        }),
        {explorer : true}
      )
    ); //Swagger Setup
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
  initRedis() { 
    require("./utlis/init_redis")
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
      const serverError = createHttpError.InternalServerError();
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
