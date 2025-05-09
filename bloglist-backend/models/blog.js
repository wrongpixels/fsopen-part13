const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../util/db')

class Blog extends Model {}

Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
  },
  {
    underscored: true,
    sequelize,
    timestamps: false,
    modelName: 'blog',
  }
)

module.exports = Blog
