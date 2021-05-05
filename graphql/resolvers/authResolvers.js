const jwt = require("jsonwebtoken")
const { JWT_SECRET } = require("../../constants/env")

const User = require("../../database/models/UserModel")
const { validateLoginUser } = require("../../utils/validators")

const authResolver = {
	Mutation: {
		loginUser: async (_, { loginUserInput: { email, password } }) => {
			try {
				const user = await validateLoginUser(email, password)

				const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1d" })

				return { user, token }
			} catch (err) {
				throw new Error(err)
			}
		},
	},
}

module.exports = authResolver
