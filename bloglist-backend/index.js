require('dotenv').config()
const express = require('express')
const { Sequelize, QueryTypes, Model, DataTypes } = require('sequelize')
const sequelize = new Sequelize(process.env.POSTGRES_URL)

const app = express()
app.use(express.json())

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
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
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
  },
)

Blog.sync()

app.get('/api/blogs', async (_, res) => {
  try {
    const blogs = await Blog.findAll()
    res.json(blogs)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get('/api/blogs/:id', async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id)
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' })
    }
    res.json(blog)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.post('/api/blogs', async (req, res) => {
  try {
    const blog = await Blog.create(req.body)
    res.json(blog)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.delete('/api/blogs/:id', async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id)
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' })
    }
    await Blog.destroy({
      where: {
        id: req.params.id,
      },
    })
    res.status(204).end()
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => console.log(`Listening to PORT ${PORT}`))
