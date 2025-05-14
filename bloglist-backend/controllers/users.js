const router = require('express').Router()
const { User, Blog } = require('../models')
const CustomError = require('../util/customError')

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      include: [
        {
          model: Blog,
          attributes: {
            exclude: ['userId'],
          },
        },
        {
          model: Blog,
          as: 'reading_blogs',
          attributes: ['title'],
          through: {
            attributes: ['read'],
            as: 'status',
          },
        },
      ],
    })
    res.json(users)
  } catch (error) {
    next(error)
  }
})

router.put('/:username', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.params.username,
      },
    })
    if (!user) {
      throw new CustomError('User does not exist', 404)
    }
    user.username = req.body.username
    await user.save()
    res.status(201).json(user)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    res.status(201).json(user)
  } catch (error) {
    next(error)
  }
})

module.exports = router
