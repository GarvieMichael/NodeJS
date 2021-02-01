//  === Requirements ===
const express = require('express')
const routes = express.Router()

//  === Controllers ===
routes.use("/", require("./routes/application_routes"))

//  === Exports ===
module.exports = routes