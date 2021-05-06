const { UserInputError, AuthenticationError } = require("apollo-server-errors")
const User = require("../database/models/UserModel")

const validateCreateUser = async (name, email, password) => {
	const isUser = await User.findOne({ email })
	if (isUser) {
		throw new UserInputError("The email is already taken.")
	}
	if (name.length < 5 || name.length > 20) {
		throw new UserInputError("Name should be b/w 5 and 20 characters.")
	}
	if (email.length < 5 || email.length > 20) {
		throw new UserInputError("Email should be b/w 5 and 20 characters.")
	}
	if (!email.includes("@") || !email.includes(".")) {
		throw new UserInputError("The email should be in correct format.")
	}
	if (password.length < 5 || password.length > 20) {
		throw new UserInputError(
			"The password should be at least 5 characters long or shorter than 20 characters."
		)
	}
}

const validateLoginUser = async (email, password) => {
	const isUser = await User.findOne({ email })
	if (!isUser) {
		throw new UserInputError("Email does not exists.")
	}

	if (isUser.password !== password) {
		throw new AuthenticationError("Password does not match.")
	}

	return isUser
}

const validateCreateLog = (number, comment) => {
	if (typeof parseInt(number) !== "number") {
		throw new UserInputError("Number should be an integer.")
	}

	if (number.toString().length !== 10) {
		throw new UserInputError("Number should be 10 characters.")
	}

	if (comment.length !== 160) {
		throw new UserInputError("comment should be of 160 characters.")
	}
}

module.exports = {
	validateCreateUser,
	validateLoginUser,
	validateCreateLog,
}
