const router = require('express').Router()
const CustomError = require('../util/customError')
const { Blog, User, ReadingList } = require('../models')
const { tokenExtractor } = require('../middleware')

router.put('/:id', tokenExtractor, async (req, res, next) => {
  try {
    const list = await ReadingList.findByPk(req.params.id)
    if (!list) {
      throw new CustomError('Error getting reading list', 400)
    }
    if (req.activeUser.id !== list.userId) {
      throw new CustomError('Unauthorized', 401)
    }
    list.read = req.body.read
    await list.save()
    res.status(200).json(list)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.body.userId, {
      include: {
        model: Blog,
        as: 'reading_blogs',
      },
    })
    const blog = await Blog.findByPk(req.body.blogId)
    if (!user || !blog) {
      throw new CustomError('Could not find User or Blog', 400)
    }
    if (user.reading_blogs.find((b) => b.id === blog.id)) {
      throw new CustomError('Blog is already in the list', 400)
    }
    const readingList = await ReadingList.create(req.body)
    res.status(201).json(readingList)
  } catch (error) {
    next(error)
  }
})

module.exports = router
