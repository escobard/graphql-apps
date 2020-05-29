const graphql = require('graphql');
const { GraphQLSchema } = graphql;

const RootQueryType = require('graphql-auth/server/schema/types/root_query_type');

module.exports = new GraphQLSchema({
  query: RootQueryType
});
