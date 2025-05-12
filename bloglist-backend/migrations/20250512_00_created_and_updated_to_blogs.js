const { DataTypes } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn('blogs', 'created_at', {
      type: DataTypes.DATE,
    })
    await queryInterface.addColumn('blogs', 'updated_at', {
      type: DataTypes.DATE,
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropColumn('blogs', 'created_at')
    await queryInterface.dropColumn('blogs', 'updated_at')
  },
}
