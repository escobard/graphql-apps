## v0.1

### Why does GraphQL exist?

* GraphQL and relay were built to deal with a very specific set of problems - mostly data overfetching with request to the API / DB.
* It exists to handle the big challenges of REST-ful routing, including data overfetching.

### REST-ful Routing

* Given a collection of records on a server, there should be a uniform URL and HTTP request method used to utilize that collection of records.
* So if we wanted to fetch all the posts, we would rely on the `/posts` route for example.
* To fetch / delete/ modify singular posts, we would rely on the `/posts/:id/` route.
* Now imagine we had to fetch the user first - `/users/23/posts` - this adds a new level of complication to the route.
* If we wanted to search that user's posts we would query `/users/:userid/posts/:postid` - see the problem here? there is a ton of URL nesting. - In other words the API first does the following: - Fetches all the users. - Fetches the individual user from the list of users. - Fetches all the posts for the user - Fetches the individual post from the list of all posts - This is essentially performing 4 different HTTP requests - Also, each request is returning a TON of unecessary data. - if we only wanted to fetch the user's name for example, why would we need the rest of the user's data?

### GraphQL

* GraphQL allows us to create complex HTTP requests to fetch SPECIFIC ammounts of data from our database within a single HTTP request.
* GraphQL queries look like this: `query{ //looks for user with the id of 23 user(id:"23"){ // looks for the all the friends for that user friends{ // fetches the companies for all the friends of the user company{ // fetches the name of that company name } } } }`
* Think of a query as an entry point into the data application
* Query expanded:
* we can name queries whatever we want, for example - naming queries is optional and is only utilized to identify on the front end

      	```
      	query findSchema{
      		schema(argument: property) {
      			schema,
      			properties,
      		}
      	}

      	Or in our case

      	{
      		user(id: "23"){
      			id,
      			firstName,
      			age
      		}
      	}

      	which would return the following data, since our schema does contain a user with that ID:
      	"data":{
      		"user": {
      			"id": "23",
      			"firstName": "Bill",
      			"age" : 20
      		}
      	}
      	```

* multiple argumental queries return different objects, depending on the query argument
* multiple argumental queries can be written like so:

```
	{
		// this sets the key of the resolution data to apple instead of the standard company
		apple: company(id: "1"){
			id
			name
			description
		}
		google: company(id: "2"){
			id
			name
			description
		}
	}
```

* this returns the following:

```
{
  "data": {
    "apple": {
      "id": "1",
      "name": "Apple",
      "description": "iphone"
    },
    "google": {
      "id": "2",
      "name": "Google",
      "description": "search"
    }
  }
}
```

* fragment queries allow you to grab properties from multiple types without repeating the properties:

```
	{
		apple: company(id: "1"){
			...companyDetails
		}
		google: company(id: "2"){
			...companyDetails
		}
	}

	// first argument is the name of the fragment
	// second is the name of the type
	fragment companyDetails on Company {
		id
		name
		description
	}
```

* mutations are callbacks that allow us to manipulate the data within our GQL runtime.
* mutation syntax looks like this:

```
mutation {

	// arguments for addUser type defined within the schema/schema file
	// arguments not defined will not return data, as usual
	addUser(firstName: "Tom", age: 26){

		// the argument here returns the properties of the mutation
		id
		firstName
		age
	}
}

mutation {
		// due to the patch request type, this mutation ONLY updates the specified fields, but requires the ID
	editUser(id:"40", firstName: "TEST"){
		id
		firstName
		age
	}
}
```

* queries LOOK like javascript but are NOT javascript
* We can also remove any DEFINED properties of the user schema within the QUERY - this will only return the specified properties of the SCHEMA within the QUERY RESULT
* All `types` within GraphQL (even imported ones from the library) are essentially objects created with the GraphQLObjectType method - super neat.

### GraphiQL

* made as an IDE by the GraphQL team to visualize graphQL queries and data fetching.
* https://workspace.ibm.com/graphql
* Has the following features: - history: shows query history for runtime - input: where we type the query - console: where we see the results of the query - documentation: where we see the current root / query types - SUPER USEFUL - this area allows to view the properties of the queries including queries, and object types

### JSON server

* creates a database on runtime to use asynchronously

```
{ // sets the route of the data
	"users":
	// sets the properties of the data
	[
	{
		"id": "23",
		"firstName": "Bill",
		"age": 20
	},
	{
		"id": "47",
		"firstName": "Samantha",
		"age": 21
	}
]
}
```

* navigating to /users will bring up the users json
* nagivating to users/23 brings up the user with the id of 23
