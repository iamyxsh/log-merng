require("dotenv").config()

const MONGO_URI = process.env.MONGO_URI
const MODE = process.env.MODE

module.exports = { MONGO_URI, MODE }
