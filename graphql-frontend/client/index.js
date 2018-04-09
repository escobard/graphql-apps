import React from 'react';
import ReactDOM from 'react-dom';

// grabs the apollo client library
import ApolloClient from 'apollo-client';

// grabs the apollo provider to hook up the apollo client with react
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient({

})

const Root = () => {
  return (
  	<ApolloProvider client={client}>
  		<div>Lyrical</div>
  	</ApolloProvider>
  	)
};

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
);
