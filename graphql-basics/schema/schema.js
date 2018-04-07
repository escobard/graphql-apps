// this file contains all of the knowledge necessary
// for GraphQL to know EXACTLY what your data looks like

const graphql = require("graphql"),
	axios = require("axios"),
	// deleted lodash since we are using async requests_ = require('lodash')
	{
		GraphQLObjectType,
		GraphQLString,
		GraphQLInt,
		GraphQLSchema,
		GraphQLList,
		GraphQLNonNull
	} = graphql;

// for this project we will use static data
// we'll be using lodash as a helper library to go through the data to save time
// deleted to use json server data instead
/*
const users = [
	{
		id: "23",
		firstName: 'Bill',
		age: '20'
	}, 
	{
		id: '47',
		firstName: 'Samantha',
		age: '21'
	}
]
*/

// an expanded explanation on how ALL of this works which is super helpful understanding
// GQL here: https://www.udemy.com/graphql-with-react-course/learn/v4/t/lecture/6523072
const CompanyType = new GraphQLObjectType({
	name: "Company",

	// we return this as a function to avoid the order of operations error
	// caused by the undefined UserType during initial runtime
	fields: () => ({
		id: { type: GraphQLString },
		name: { type: GraphQLString },
		description: { type: GraphQLString },

		// this allows us to query for users with the CompanyType as the parentValue, much like was done int he users type below
		users: {
			// this type expects a LIST of OBJECTS to be returned
			// this throws an error since the UserType has not been defined yet
			type: new GraphQLList(UserType),
			resolve(parentValue, args) {
				return axios
					.get(`http://localhost:3000/companies/${parentValue.id}/users`)
					.then(resolve => resolve.data);
			}
		}
	})
});

// creates an object type - a schema that graphql uses
const UserType = new GraphQLObjectType({
	// sets the name of the object type
	name: "User",

	// this sets the properties that    the object type has - the keys of fields aka fields.key
	// is the property we want our User schema to have
	fields: () => ({
		// very similar to mongoose, we have to declare the type of each of the schema fields
		// for graphQL to recognize
		id: { type: GraphQLString },
		firstName: { type: GraphQLString },
		age: { type: GraphQLInt },

		// relational fields are treated mostly like any other field
		// the field property is named differently than our actual JSON server data, so it needs a resolver
		company: {
			type: CompanyType,
			// the resolve function can be used for asynchronous requests almost anywhere within the GraphQL runtime
			resolve(parentValue, args) {
				// this is how you resolve data types in the database that don't match the graphQL
				// schema for any given type - can be easily avoided by matching property names exactly
				// but I will most likely run into this in the future so its great practice
				return axios
					.get(`http://localhost:3000/companies/${parentValue.companyId}`)
					.then(response => response.data);
			}
		}
	})
});

// this defines the query for our user data, telling graphQL how to look for the data within our database
const RootQuery = new GraphQLObjectType({
	name: "RootQueryType",
	fields: {
		// essentially this does the following:
		// creates the property users, which contains the data of the selected type

		// this is the property the query will accept
		user: {
			// creates the grabs all properties from the UserType schema (or ObjectType) defined above
			type: UserType,

			// creates the arguments of the query
			args: {
				// tells it to look for the id argument, and sets the type to string
				// this sets the argument of this query
				id: { type: GraphQLString }
			},

			// defines the resolve callback function, which is the method that ACTUALLY goes inside the database
			// and returns the properties we are looking for
			resolve(
				// this argument is apparently never really used but it returns the value of the parent object
				// in this case, our user with a specific id
				parentValue,
				// calls whatever arguments were passed into the query
				// (set above in RootQueryType.fields.user.args)
				// in our case this is the id argument
				args
			) {
				// this finds a user with a given user id from the users[array] we just created
				// this is using the lodash library

				// graphQL will accept any kind of raw data type (sql, json, etc)
				// and convert it here into GQL for us to use within the GQL runtime

				// returns our json data returned from the axios promise
				return (
					axios
						.get(`http://localhost:3000/users/${args.id}`)

						// with axios our response's data is attached to the .data property
						// we need to return this to tell graphQL where the data is
						.then(response => response.data)
				);
			}
		},
		company: {
			type: CompanyType,
			args: {
				id: { type: GraphQLString }
			},
			resolve(parentValue, args) {
				return axios
					.get(`http://localhost:3000/companies/${args.id}`)
					.then(response => response.data);
			}
		}
	}
});

// here we define mutations for our data, more on that here: http://graphql.org/learn/queries/
// essentially mutations are ways to manipulate fetched data within the GQL runtime
const mutation = new GraphQLObjectType({
	name: "Mutation",
	fields: {
		addUser: {
			type: UserType,
			args: {
				firstName: {
					// the method GraphQLNonNull REQUIRES this argument within the mutation query
					// this is a slight level of validation, which makes it so that the user
					// cannot leave this field empty
					type: new GraphQLNonNull(GraphQLString)
				},
				age: { type: new GraphQLNonNull(GraphQLInt) },
				companyId: { type: GraphQLString }
			},
			// deconstructs the second argument
			resolve(parentValue, { firstName, age }) {
				return (
					axios
						// first argument is the URL for the post request, second argument is the properties we are sending with the post request
						.post("http://localhost:3000/users", { firstName, age })
						.then(resolve => resolve.data)
				);
			}
		},
		deleteUser: {
			type: UserType,
			args: {
				id: { type: new GraphQLNonNull(GraphQLString) }
			},
			// deconstructs the second argument
			resolve(parentValue, { id }) {
				return axios
					.delete(`http://localhost:3000/users/${id}`)
					.then(resolve => resolve.data);
			}
		},
		editUser: {
			type: UserType,
			args: {
				id: { type: new GraphQLNonNull(GraphQLString) },
				firstName: { type: GraphQLString },
				age: { type: GraphQLInt },
				companyId: { type: GraphQLInt }
			},
			// deconstructs the second argument
			resolve(parentValue, args) {
				return axios
					.patch(`http://localhost:3000/users/${args.id}`, args)
					.then(resolve => resolve.data);
			}
		}
	}
});

// this effectively creates the schema, passing it the RootQuery created above
module.exports = new GraphQLSchema({
	query: RootQuery,
	// shortened from mutation:mutation
	mutation
});
