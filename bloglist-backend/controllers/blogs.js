const router = require('express').Router()
const { Blog } = require('../models')
const { fetchBlog } = require('../middleware')

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

router.post('/', async (req, res, next) => {
  try {
    const blog = await Blog.create(req.body)
    res.json(blog)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', fetchBlog, async (req, res, next) => {
  try {
    await req.blog.destroy()
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

module.exports = router
