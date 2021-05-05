const { UserInputError, AuthenticationError } = require("apollo-server-errors")
const User = require("../database/models/UserModel")

const validateCreateUser = async (name, email, password) => {
	const isUser = await User.findOne({ email })
	if (isUser) {
		throw new UserInputError("Email is taken.", {
			errors: {
				email: "The email is already taken.",
			},
		})
	}

	if (name.trim < 5 || name > 20) {
		throw new UserInputError("User Input Error", {
			errors: {
				name: "Name should be b/w 5 and 20 characters.",
			},
		})
	}
	if (email.trim < 5 || email > 20) {
		throw new UserInputError("User Input Error", {
			errors: {
				email: "Email should be b/w 5 and 20 characters.",
			},
		})
	}
	if (!email.includes("@") || !email.includes(".")) {
		throw new UserInputError("User Input Error", {
			errors: {
				email: "The email should be in correct format.",
			},
		})
	}
	if (password.trim < 5 || password > 20) {
		throw new UserInputError("User Input Error.", {
			errors: {
				email:
					"The password should be at least 5 characters long or shorter than 20 characters.",
			},
		})
	}
}

const validateLoginUser = async (email, password) => {
	const isUser = await User.findOne({ email })
	if (!isUser) {
		throw new UserInputError("User Input Error", {
			errors: {
				email: "Email does not exists.",
			},
		})
	}

	if (isUser.password !== password) {
		throw new AuthenticationError("Authentication Error", {
			errors: {
				email: "Password does not match.",
			},
		})
	}

	return isUser
}

const validateCreateLog = (number, comment) => {
	if (typeof parseInt(number) !== "number") {
		throw new UserInputError("Number should be an integer.")
	}

	if (number.length !== 10) {
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
