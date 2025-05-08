const router = require('express').Router()
const { Blog } = require('../models')

const fetchBlog = async (req, res, next) => {
  try {
    req.blog = await Blog.findByPk(req.params.id)
    if (!req.blog) {
      return res.status(404).json({ error: 'Blog was not found' })
    }
    next()
  } catch (error) {
    res.status(500).json(error)
  }
}

router.get('/', async (_, res) => {
  try {
    const blogs = await Blog.findAll()
    res.json(blogs)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.get('/:id', fetchBlog, async (req, res) => {
  try {
    res.json(req.blog)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.put('/:id', fetchBlog, async (req, res) => {
  try {
    const likes = Number(req.body.likes)
    if (isNaN(likes)) {
      return res.status(400).json({ error: 'Likes must be a number' })
    }
    req.blog.likes = likes
    await req.blog.save()
    res.json(req.blog)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.post('/', async (req, res) => {
  try {
    const blog = await Blog.create(req.body)
    res.json(blog)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.delete('/:id', fetchBlog, async (req, res) => {
  try {
    await req.blog.destroy()
    res.status(204).end()
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router
