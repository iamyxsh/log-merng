const mongoose = require("mongoose")

module.exports = (uri, mode) => {
	try {
		mongoose
			.connect(uri, {
				useNewUrlParser: true,
				useUnifiedTopology: true,
				useCreateIndex: true,
				useFindAndModify: false,
			})
			.then(() =>
				mode === "DEVELOPMENT" ? console.log("Connected To Database.") : null
			)
	} catch (err) {
		console.log(err)
	}
}
