import React from "react";
import ReactDOM from "react-dom";

// grabs the apollo client library
import ApolloClient from "apollo-client";

// grabs the apollo provider to hook up the apollo client with react
import { ApolloProvider } from "react-apollo";
import { Router, Route, hashHistory, IndexRoute } from "react-router";

import App from "./components/App"
import SongList from "./components/SongList";
import SongCreate from "./components/SongCreate";

// apollo requires 0 configuration out of the box to work with your graphql server
// as long as the /graphql route is setup on the API
// min config: const client = new ApolloClient({})
const client = new ApolloClient({});

const Root = () => {
	return (
		<ApolloProvider client={client}>
			<Router history={hashHistory}>
				<Route path="/" component={App}>
					<IndexRoute component={SongList} />
					<Route path="song/new" component={SongCreate}/>
				</Route>
			</Router>
		</ApolloProvider>
	);
};

ReactDOM.render(<Root />, document.querySelector("#root"));