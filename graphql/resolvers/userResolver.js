const User = require("../../database/models/UserModel")
const { checkToken, checkAdmin } = require("../../utils/auth")

const { validateCreateUser } = require("../../utils/validators")

const userResolver = {
	Query: {
		getUsers: async (_, { limit, skip, term }, ctx) => {
			if (!term) term = ""

			await checkAdmin(ctx)
			let users = await User.find({
				email: { $regex: term, $options: "i" },
			})
				.limit(limit)
				.skip(skip * limit)

			users = users.map((user) => {
				return {
					id: user._id,
					password: user.password,
					email: user.email,
					createdAt: user.createdAt,
					isAdmin: user.isAdmin,
					name: user.name,
				}
			})

			return users
		},
	},

	Mutation: {
		createUser: async (_, { createUserInput: { name, email, password } }) => {
			try {
				await validateCreateUser(name, email, password)
				const user = await User.create({ name, email, password })
				return user
			} catch (err) {
				throw new Error(err)
			}
		},
		updateUserInfo: async (
			_,
			{ updateUserInput: { name, email, password, userId } },
			ctx
		) => {
			try {
				await checkAdmin(ctx)
				await validateCreateUser(name, email, password)

				const user = await User.findByIdAndUpdate(
					userId,
					{
						name,
						email,
						password,
						isAdmin,
					},
					{ new: true }
				)

				return user
			} catch (err) {
				throw new Error(err)
			}
		},
		updateAdminInfo: async (
			_,
			{ updateAdminInfoInput: { isAdmin, userId } },
			ctx
		) => {
			try {
				await checkAdmin(ctx)

				const user = await User.findByIdAndUpdate(
					userId,
					{ isAdmin },
					{ new: true }
				)

				return user
			} catch (err) {
				throw new Error(err)
			}
		},
	},
}

module.exports = userResolver
