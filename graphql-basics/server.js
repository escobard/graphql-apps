const express = require('express'),
expressGraphQL = require('express-graphql'),
schema = require('./schema/schema')

const app = express()

// the .use() method is intended to BIND middlewares to your application under certain routes
app.use('/graphql', 

	// grabs the express-graphQL middleware to handle with our routes
	// this tells express to handle this particular request with the graphQL library
	expressGraphQL({

		// sets the schema of the middleware for this route
		// abbreviated from schema : schema with ES6
		schema,
		// this tells the application to display the graphiql IDE when this route is reached
		graphiql: true
	}))

app.listen(4000, () =>{
	console.log('Listening on port 4000')
})