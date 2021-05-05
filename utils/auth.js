const { AuthenticationError } = require("apollo-server-errors")
const jwt = require("jsonwebtoken")
const { JWT_SECRET } = require("../constants/env")
const User = require("../database/models/UserModel")

const checkToken = async (ctx) => {
	const token = ctx.req.headers.authorization.split(" ")[1]

	if (!token) {
		throw new AuthenticationError(
			"Token should be in format of 'Bearer <token>'."
		)
	}

	const decoded = await jwt.verify(token, JWT_SECRET)
	if (!decoded) {
		throw new AuthenticationError("Invalid/Expired token.")
	}

	return decoded.id
}

const checkAdmin = async (ctx) => {
	const user_id = await checkToken(ctx)

	const admin = await User.findById(user_id)

	if (!admin || !admin.isAdmin) {
		throw new AuthenticationError("Unauthorized access.")
	}
}

module.exports = {
	checkToken,
	checkAdmin,
}
