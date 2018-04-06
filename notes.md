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