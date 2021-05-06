const Logs = require("../../database/models/LogModel")
const User = require("../../database/models/UserModel")
const { checkToken } = require("../../utils/auth")

const { validateCreateLog } = require("../../utils/validators")

const logResolver = {
	Query: {
		getLogs: async (_, { limit, skip, term }, ctx) => {
			if (!term) term = ""
			const userId = await checkToken(ctx)

			const logs = await Logs.find({
				number: { $regex: term, $options: "i" },
				userId,
			})
				.limit(limit)
				.skip(skip)

			return logs
		},
	},

	Mutation: {
		createLog: async (_, { createLogInput: { number, comment } }, ctx) => {
			try {
				const userId = await checkToken(ctx)
				validateCreateLog(number, comment)
				const log = await Logs.create({
					number: parseInt(number),
					comment,
					userId,
				})

				return log
			} catch (err) {
				throw new Error(err)
			}
		},
	},
}

module.exports = logResolver
