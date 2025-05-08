const { DatabaseError } = require('sequelize')
const { Blog } = require('../models')

const fetchBlog = async (req, res, next) => {
  try {
    req.blog = await Blog.findByPk(req.params.id)
    if (!req.blog) {
      throw new DatabaseError('Blog was not found')
    }
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = fetchBlog
