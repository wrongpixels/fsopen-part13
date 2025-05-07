const {Sequelize, QueryTypes, Model, DataTypes} = require('sequelize')
const POSTGRES_URL = 'postgres://postgres:supersafe@localhost:5432/postgres'
const sequelize = new Sequelize(POSTGRES_URL)

class Blog extends Model{}

Blog.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    author: {
        type: DataTypes.TEXT,
    },
    title: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    url: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    likes: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
}, {
    underscored: true,
    sequelize,
    timestamps: false,
    modelName: 'blog'
})

const getBlogs = async () => {
    const blogs = await Blog.findAll()
    console.log(JSON.stringify(blogs, null, 2))
}

getBlogs()