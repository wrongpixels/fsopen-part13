const router = require('express').Router()
const { Blog } = require('../models')
const { sequelize } = require('../util/db')

router.get('/', async (req, res, next) => {
  try {
    const authors = await Blog.findAll({
      group: ['author'],
      attributes: [
        'author',
        [sequelize.fn('COUNT', sequelize.col('id')), 'blogs'],
        [sequelize.fn('SUM', sequelize.col('likes')), 'likes'],
      ],
      order: [['likes', 'DESC']],
    })
    res.json(authors)
  } catch (error) {
    next(error)
  }
})

module.exports = router
