// this file contains all of the knowledge necessary
// for GraphQL to know EXACTLY what your data looks like

const graphql = require('graphql');

// this grabs the properties that we need to define our schema from the graphql library
const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt,
	GraphQLSchema
} = graphql;

// for this project we will use static data
// we'll be using lodash as a helper library to go through the data to save time
const users = [
	{
		id: '23',
		firstName: 'Bill',
		age: '20'
	}, 
	{
		id: '47',
		firstName: 'Samantha',
		age: '21'
	}
]



// creates an object type - a schema that graphql uses
const UserType = new GraphQLObjectType({
	// sets the name of the object type
	name: 'User',

	// this sets the properties that the object type has - the keys of fields aka fields.key
	// is the property we want our User schema to have
	fields: {

		// very similar to mongoose, we have to declare the type of each of the schema fields
		// for graphQL to recognize
		id: { type: GraphQLString },
		firstName: {type: GraphQLString },
		age: { type: GraphQLInt }
	}
})

// this defines the query for our user data, telling graphQL how to look for the data within our database
const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields:{

		// essentially this does the following:
		// creates the property users, which contains the data of the selected type
		user:{

			// creates the grabs all properties from the UserType schema (or ObjectType) defined above
			type: UserType,

			// creates the arguments of the query
			args: {

				// tells it to look for the id argument, and sets the type to string
				id: {type: GraphQLString}
			},
			
			// defines the resolve callback function, which is the method that ACTUALLY goes inside the database
			// and returns the properties we are looking for
			resolve(

				// this argument is apparently never really used
				parentValue, 

				// calls whatever arguments were passed into the query 
				// (set above in RootQueryType.fields.user.args)
				// in our case this is the id argument 
				args){

					// this finds a user with a given user id from the users[array] we just created
					// this is using the lodash library
					return 

						// runs a forEach statement for the object in the first argument (users) with 
						// the argument's id and returns the object as the query result
						_.find(users, {id: args.id })
			}
		}
	}
})

// this effectively creates the schema, passing it the RootQuery created above
module.exports = new GraphQLSchema({
	query: RootQuery
})