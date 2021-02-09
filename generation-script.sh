#!/bin/bash

# This creates the intial explanation of the script
echo
echo 'This will create a route and controller from the input given, and populate these files with the given methods.'

new_route="${PWD}/config/routes/${1}_routes.js"
new_controller="${PWD}/app/controllers/${1}_controller.js"
controller_name=$1
shift 1
	
# This will ensure that the script has not been called with no inputs
if [[ $# == 0 ]]
then
	echo 'Incorrect inputs'
	echo
	echo 'exiting'
	echo
	exit

# If the script is called with one argument, it is assumed this is the name 
# of the controller and route, and it creates blank controllers and routes. 
elif [[ $# == 1 ]]
then
	if [ ! -f $new_controller ]
	then
		echo 'Creating new controller'
		touch $new_controller
	fi
	echo
	if [ ! -f $new_route ]
	then
		echo 'Creating new route'
		touch $new_route
		
	fi
	echo
# If there are more than one arguments, the script uses arguments
# 2 and onward to create methods for the controllers and routes
elif [[ $# > 1 ]]
then
	count=1
	for method in $@
	do
		methodArray[$count]=$method;
		((count++))
	done
	echo 
	# echo ${array[@]}
	if [ ! -f $new_controller ]
	then
		echo 'Creating new controller'
		touch $new_controller
		printf "
		// === Requirements === 
		const faker = require('faker')

		// === Controller ===
		module.exports = {" >> $new_controller
		for i in "${methodArray[@]}"
		do
			printf "
			${i}: function(request)
			{
				console.log(\"${controller_name}_controller.${i}\")
				return{
					id: faker.random.number()
				}
			},
			" >> $new_controller
		done
		echo "}" >> $new_controller

	fi
	if [ ! -f $new_route ]
	then
		echo 'Creating new route'
		echo
		touch $new_route
		printf "// === Requirements === 
		const express = require('express')
		const ${controller_name}_routes = express.Router()
		const ${controller_name}_controller = require(\"../../app/controllers/${controller_name}_controller\")

		// === Routes ===" >> $new_route
		for i in "${methodArray[@]}"
		do
			if [[ $i == *'show'* || $i == *'index'* ]]
			then
				crud_method=get
			elif [[ $i == *'update'* ]]
			then
				crud_method=put
			elif [[ $i == *'delete'* ]]
			then
				crud_method=delete
			elif [[ $i == *'create'* ]]
			then
				crud_method=post
			else
				crud_method=get
			fi
			printf "
			${controller_name}_routes.${crud_method}(\"/\", (request, response) => {
				response.send( ${controller_name}_controller.${i}( request ) )
				})
				" >> $new_route
		done
		
		printf "
		// === Exports ===
		module.exports = ${controller_name}_routes" >> $new_route
		
	fi
fi

echo running prettier

eval npx prettier --write "config/routes/${controller_name}_routes.js"
eval npx prettier --write "app/controllers/${controller_name}_controller.js"

echo
echo 'exiting'
echo
exit
