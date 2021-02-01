//  === Requirements ===
var express = require('express')
var application_routes = express.Router()
var application_controller = require("../../app/controllers/application_controller")

//  === Routes ===
application_routes.all('/', (request, response) => {
  response.send( application_controller.default(request) )
})

//  === Exports ===
module.exports = application_routes