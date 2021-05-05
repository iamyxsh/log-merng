require("dotenv").config()

const MONGO_URI = process.env.MONGO_URI
const MODE = process.env.MODE
const JWT_SECRET = process.env.JWT_SECRET

module.exports = { MONGO_URI, MODE, JWT_SECRET }
