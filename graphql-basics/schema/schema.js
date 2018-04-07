// this file contains all of the knowledge necessary
// for GraphQL to know EXACTLY what your data looks like

const graphql = require('graphql');

// this grabs the properties that we need to define our schema from the graphql library
const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt
} = graphql;

// creates an object type - a schema that graphql uses
const UserType = new GraphQLObjectType({
	// sets the name of the object type
	name: 'User',

	// this sets the properties that the user has - the keys of fields aka fields.key
	// is the property we want our User schema to have
	fields: {

		// very similar to mongoose, we have to declare the type of each of the schema fields
		// for graphQL to recognize
		id: { type: GraphQLString },
		firstName: {type: GraphQLString },
		age: { type: GraphQLInt }
	}
})