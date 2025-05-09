const router = require('express').Router()
const { Blog } = require('../models')
const { fetchBlog, tokenExtractor } = require('../middleware')
const CustomError = require('../util/customError')

router.get('/', async (_, res, next) => {
  try {
    const blogs = await Blog.findAll()
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
