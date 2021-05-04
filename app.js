const { ApolloServer } = require("apollo-server")

const { MONGO_URI, MODE } = require("./constants/env")
const mongooseConnection = require("./database/mongooseConnection")
const typeDefs = require("./graphql/typeDefs")
const resolvers = require("./graphql/resolvers")

const server = new ApolloServer({ typeDefs, resolvers })

mongooseConnection(MONGO_URI, MODE)

server
	.listen({ port: 5000 })
	.then((res) => console.log(`Server running at ${res.url}`))
