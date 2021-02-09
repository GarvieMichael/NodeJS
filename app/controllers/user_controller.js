
		// === Requirements === 
		const faker = require('faker')

		// === Controller ===
		module.exports = {
			show: function(request)
			{
				console.log("user_controller.show")
				return{
					id: faker.random.number()
				}
			},
			
			index: function(request)
			{
				console.log("user_controller.index")
				return{
					id: faker.random.number()
				}
			},
			
			create_file: function(request)
			{
				console.log("user_controller.create_file")
				return{
					id: faker.random.number()
				}
			},
			
			delete: function(request)
			{
				console.log("user_controller.delete")
				return{
					id: faker.random.number()
				}
			},
			}
