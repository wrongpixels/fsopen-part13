require('dotenv').config()

module.exports = {
  PORT: process.env.PORT || 3001,
  POSTGRES_URL: process.env.POSTGRES_URL,
}
