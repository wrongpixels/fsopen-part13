const { DataTypes } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('users', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    })
    await queryInterface.addColumn('users', 'created_at', {
      type: DataTypes.DATE,
    })
    await queryInterface.addColumn('users', 'updated_at', {
      type: DataTypes.DATE,
    })
    await queryInterface.createTable('blogs', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      author: {
        type: DataTypes.TEXT,
      },
      title: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
      },
      url: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
      },
      likes: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    })
    await queryInterface.addColumn('blogs', 'user_id', {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    })
    await queryInterface.addColumn('blogs', 'created_at', {
      type: DataTypes.DATE,
    })
    await queryInterface.addColumn('blogs', 'updated_at', {
      type: DataTypes.DATE,
    })
  },

  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('users')
    await queryInterface.dropTable('blogs')
  },
}
