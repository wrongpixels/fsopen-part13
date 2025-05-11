const router = require('express').Router()
const { Blog, User } = require('../models')
const { fetchBlog, tokenExtractor } = require('../middleware')
const CustomError = require('../util/customError')
const { Op } = require('sequelize')

router.get('/', async (req, res, next) => {
  try {
    const where = {}

    if (req.query.search) {
      where[Op.or] = [
        { title: { [Op.iLike]: `%${req.query.search}%` } },
        { author: { [Op.iLike]: `%${req.query.search}%` } },
      ]
    }

    const blogs = await Blog.findAll({
      attributes: {
        exclude: ['userId'],
      },
      include: {
        model: User,
        attributes: ['username'],
      },
      where,
    })
    res.json(blogs)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', fetchBlog, async (req, res, next) => {
  try {
    res.json(req.blog)
  } catch (error) {
    next(error)
  }
})

router.put('/:id', fetchBlog, async (req, res, next) => {
  try {
    const likes = Number(req.body.likes)
    if (likes && isNaN(likes)) {
      throw new SyntaxError('Likes must be a number')
    }
    req.blog.likes = likes
    await req.blog.save()
    res.json(req.blog)
  } catch (error) {
    next(error)
  }
})

router.post('/', tokenExtractor, async (req, res, next) => {
  try {
    const blog = await Blog.create({ ...req.body, userId: req.activeUser.id })
    res.json(blog)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', tokenExtractor, fetchBlog, async (req, res, next) => {
  try {
    if (req.activeUser.id !== req.blog.userId) {
      console.log(req.activeUser.id, req.blog.userId)
      throw new CustomError('Wrong credentials!', 401)
    }
    await req.blog.destroy()
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

module.exports = router
