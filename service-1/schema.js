const { makeExecutableSchema } = require('graphql-tools');
const data = require('./data');

// SCHEMA DEFINITION
const typeDefs = `
type Query {
  user(id: ID!): User
}
type User {
  id: ID!
  name: String
}`

// RESOLVERS
const resolvers = {
	Query: {
		user: (root, args, context, info) => {
			return data.find(item => item.id == args.id);
		}
	},
}

// (EXECUTABLE) SCHEMA
module.exports = makeExecutableSchema({
	typeDefs,
	resolvers
});