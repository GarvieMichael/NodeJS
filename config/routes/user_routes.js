// === Requirements === 
		const express = require('express')
		const user_routes = express.Router()
		const user_controller = require("../../app/controllers/user_controller")

		// === Routes ===
			user_routes.get("/", (request, response) => {
				response.send( user_controller.show( request ) )
				})
				
			user_routes.get("/", (request, response) => {
				response.send( user_controller.index( request ) )
				})
				
			user_routes.post("/", (request, response) => {
				response.send( user_controller.create_file( request ) )
				})
				
			user_routes.delete("/", (request, response) => {
				response.send( user_controller.delete( request ) )
				})
				
		// === Exports ===
		module.exports = user_routes >> /home/garviem/Microservices/NodeJS/config/routes/user_routes.js
		