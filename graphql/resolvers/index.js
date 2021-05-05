const authResolver = require("./authResolvers")
const logResolver = require("./logResolvers")
const userResolver = require("./userResolver")

const resolvers = {
	Query: {
		...userResolver.Query,
		...authResolver.Query,
		...logResolver.Query,
	},
	Mutation: {
		...userResolver.Mutation,
		...authResolver.Mutation,
		...logResolver.Mutation,
	},
}

module.exports = resolvers
