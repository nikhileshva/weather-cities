"use strict";

let express = require("express");
let consign = require("consign");
let logger = require("winston");
let app = express();
let dotenv = require("dotenv").config();

// dotenv.load({ path: ".env" });

let appPort = process.env.APP_PORT || "3003";

consign()
    .include("./middlewares/basicSettings.js")
    .then("./helpers")
    .then("./utils")
    .then("./db/config.js")
    .then("./db/sequelize.js")
    .then('./validators')
    .then('./models')
    .then('./repositories')
    .then('./services')
    .then("./controllers")
    .then("./routes")
    .then("./middlewares/mainRoutes.js")
    .then("./middlewares/errorHandler.js")
    .into(app);

if (process.env.NODE_ENV !== "test") {
    app.listen(appPort, () => {
        logger.info(`Server started on port ${appPort}`);
    });
}
module.exports = app;

