const { DataTypes } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn('blogs', 'year', {
      type: DataTypes.INTEGER,
      validate: {
        max: new Date().getFullYear(),
        min: 1991,
      },
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropColumn('blogs', 'year')
  },
}
