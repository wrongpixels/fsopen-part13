const { Sequelize } = require('sequelize')
const { POSTGRES_URL } = require('./config')

const sequelize = new Sequelize(POSTGRES_URL)

const startDB = async () => {
  try {
    await sequelize.authenticate()
    console.log('Connected to PostgreSQL DB')
  } catch {
    console.error("Couldn't connect to Post")
  }
}

module.exports = { sequelize, startDB }
