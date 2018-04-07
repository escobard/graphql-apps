## v0.1

### Why does GraphQL exist?

- GraphQL and relay were built to deal with a very specific set of problems - mostly data overfetching with request to the API / DB.
- It exists to handle the big challenges of REST-ful routing, including data overfetching.

### REST-ful Routing

- Given a collection of records on a server, there should be a uniform URL and HTTP request method used to utilize that collection of records.
- So if we wanted to fetch all the posts, we would rely on the `/posts` route for example.
- To fetch / delete/ modify singular posts, we would rely on the `/posts/:id/` route.
- Now imagine we had to fetch the user first - `/users/23/posts` - this adds a new level of complication to the route.
- If we wanted to search that user's posts we would query `/users/:userid/posts/:postid`
	- see the problem here? there is a ton of URL nesting.
		- In other words the API first does the following:
			- Fetches all the users.
			- Fetches the individual user from the list of users.
			- Fetches all the posts for the user
			- Fetches the individual post from the list of all posts
		- This is essentially performing 4 different HTTP requests
			- Also, each request is returning a TON of unecessary data.
				- if we only wanted to fetch the user's name for example, why would we need the rest of the user's data?

### GraphQL

- GraphQL allows us to create complex HTTP requests to fetch SPECIFIC ammounts of data from our database within a single HTTP request.
- GraphQL queries look like this:
	```
	query{
		//looks for user with the id of 23
		user(id:"23"){
			// looks for the all the friends for that user
			friends{
				// fetches the companies for all the friends of the user
				company{
					// fetches the name of that company
					name
				}
			}
		}
	}
	```
- Think of a query as an entry point into the data application
- Query expanded:

	```
	{
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
- queries LOOK like javascript but are NOT javascript
- We can also remove any DEFINED properties of the user schema within the QUERY
	- this will only return the specified properties of the SCHEMA within the QUERY RESULT

### GraphiQL

- made as an IDE by the GraphQL team to visualize graphQL queries and data fetching.
- https://workspace.ibm.com/graphql
- Has the following features:
	- history: shows query history for runtime
	- input: where we type the query
	- console: where we see the results of the query
	- documentation: where we see the current root / query types - SUPER USEFUL
		- this area allows to view the properties of the queries including queries, and object types

### JSON server

- creates a database on runtime to use asynchronously
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