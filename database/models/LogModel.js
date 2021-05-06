const mongoose = require("mongoose")

const logsSchema = new mongoose.Schema(
	{
		number: {
			type: String,
		},
		comment: {
			type: String,
		},
		userId: {
			type: mongoose.Schema.Types.ObjectId,
		},
	},
	{
		timestamps: true,
	}
)

const Logs = mongoose.model("Logs", logsSchema)

module.exports = Logs
