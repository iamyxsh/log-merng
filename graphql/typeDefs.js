const { gql } = require("apollo-server-core")

const typeDefs = gql`
	type User {
		id: String!
		name: String!
		email: String!
		password: String!
		isAdmin: Boolean
	}

	input createUserInput {
		name: String!
		email: String!
		password: String!
	}

	type Query {
		getUsers: [User]!
	}

	type Mutation {
		createUser(createUserInput: createUserInput): User
	}
`
module.exports = typeDefs
