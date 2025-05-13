const { Sequelize } = require('sequelize')
const { POSTGRES_URL } = require('./config')
const { Umzug, SequelizeStorage } = require('umzug')

const sequelize = new Sequelize(POSTGRES_URL)

const migrationConf = {
  migrations: {
    glob: 'migrations/*.js',
  },
  storage: new SequelizeStorage({ sequelize, table: 'migrations' }),
  context: sequelize.getQueryInterface(),
  logger: console,
}

const runMigrations = async () => {
  const migrator = new Umzug(migrationConf)
  const migrations = await migrator.up()
  console.log('Migrations were applied!', {
    files: migrations.map((m) => m.name),
  })
}

const rollbackMigrations = async () => {
  await sequelize.authenticate()
  const migrator = new Umzug(migrationConf)
  await migrator.down()
  console.log('Rollback migrations finished')
}

const startDB = async () => {
  try {
    await sequelize.authenticate()
    await runMigrations()
    console.log('Connected to PostgreSQL DB')
  } catch {
    console.error("Couldn't connect to Post")
    return process.exit(1)
  }
}

module.exports = { sequelize, startDB, rollbackMigrations }
