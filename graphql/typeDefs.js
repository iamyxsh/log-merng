const { gql } = require("apollo-server-core")

const typeDefs = gql`
	type User {
		id: String!
		name: String!
		email: String!
		isAdmin: Boolean
	}
	type Log {
		id: String!
		number: String!
		comment: String!
		userId: String!
	}
	type LoginResult {
		user: User
		token: String!
	}

	input createUserInput {
		name: String!
		email: String!
		password: String!
		isAdmin: Boolean!
	}
	input updateUserInfoInput {
		name: String!
		email: String!
		password: String!
		isAdmin: Boolean!
	}
	input updateAdminInfoInput {
		isAdmin: Boolean!
		userId: String!
	}
	input loginUserInput {
		email: String!
		password: String!
	}
	input createLogInput {
		number: String!
		comment: String!
	}

	type Query {
		getUsers(limit: Int!, skip: Int!, term: String): [User]!
		getLogs(limit: Int!, skip: Int!, term: String): [Log]!
	}

	type Mutation {
		loginUser(loginUserInput: loginUserInput): LoginResult!
		createUser(createUserInput: createUserInput): User!
		updateUserInfo(updateUserInfoInput: updateUserInfoInput): User!
		updateAdminInfo(updateAdminInfoInput: updateAdminInfoInput): User!
		createLog(createLogInput: createLogInput): Log!
	}
`
module.exports = typeDefs
