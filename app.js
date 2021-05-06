const { ApolloServer } = require("apollo-server")

const { MONGO_URI, MODE, PORT } = require("./constants/env")
const mongooseConnection = require("./database/mongooseConnection")
const typeDefs = require("./graphql/typeDefs")
const resolvers = require("./graphql/resolvers")

const port = PORT || 5000

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: ({ req }) => ({ req }),
})

mongooseConnection(MONGO_URI, MODE)

server
	.listen({ port })
	.then((res) => console.log(`Server running at ${res.url}`))
