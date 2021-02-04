//  === Requirements ===
const express = require('express')
const application = express()
const logger = require("morgan")
const database_helper = require("./helpers/database_helper")

//  === Middleware ===
application.use(logger('combined', { stream: require("./logs/log_helper")}))
application.use("/", require("./config/routes"))

// === Database Connectivity Testing ===
database_helper.test_connectivity()

//  === Engine Setup ===
application.listen(8080);

//  === Exports ===
module.exports = application;