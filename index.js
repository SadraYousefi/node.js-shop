//Sign access token has been changed to 1 year for test purpose

const Application = require("./app/server");
require("dotenv").config();
new Application(
  process.env.PORT,
  process.env.DB_URI ,
);