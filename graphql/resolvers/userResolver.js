const { UserInputError } = require("apollo-server-errors")
const User = require("../../database/models/UserModel")

const userResolver = {
	Query: {
		getUsers: async () => {
			const users = await User.find()
			return users
		},
	},

	Mutation: {
		createUser: async (_, { createUserInput: { name, email, password } }) => {
			const isUser = await User.findOne({ email })
			if (isUser) {
				throw new UserInputError("Email is taken.", {
					errors: {
						email: "The email is already taken.",
					},
				})
			}

			const user = await User.create({ name, email, password })
			return user
		},
	},
}

module.exports = userResolver
