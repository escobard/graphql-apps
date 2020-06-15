import React from "react";
import ReactDOM from "react-dom";
import { Router, hashHistory, Route, IndexRoute } from "react-router";

import ApolloClient, { createNetworkInterface } from "apollo-client";
import { ApolloProvider } from "react-apollo";

import App from "./App";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import requireAuth from "./hoc/requireAuth";

// apollo assumes the gql client on the server is listening to /graphql, but using a networkInterface removes the
// implicit behavior, so the uri property is required
const networkInterface = createNetworkInterface({
  uri: "/graphql",
  opts: {
    // tells apollo to send along cookies with every query it sends to the server
    credentials: "same-origin"
  }
});

// TODO - different setup from Cleanover, flag for Jason
const client = new ApolloClient({
  networkInterface,
  // identify every record that comes back from the server, So rather than refetching our data for every single query
  // that is issued, Apollo will have the ability to identify the information that its already been pulled down from
  // the server and store it inside of some local cache.
  // https://www.apollographql.com/docs/react/caching/cache-configuration/
  // https://www.apollographql.com/docs/react/caching/cache-configuration/#custom-identifiers
  dataIdFromObject: o => o.id
});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <Route path="login" component={Login} />
          <Route path="signup" component={Signup} />
          <Route path="dashboard" component={requireAuth(Dashboard)} />
        </Route>
      </Router>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector("#root"));
