const router = require('express').Router()
const { tokenExtractor, adminChecker } = require('../middleware')
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
          },
        },
      ],
    })
    res.json(users)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const where = {}
    if (req.query.read === 'true' || req.query.read === 'false') {
      where.read = req.query.read === 'true' ? true : false
    }
    const user = await User.findByPk(req.params.id, {
      attributes: ['name', 'username'],
      include: [
        {
          model: Blog,
          attributes: {
            exclude: ['userId', 'createdAt', 'updatedAt'],
          },
        },
        {
          model: Blog,
          as: 'reading_blogs',
          attributes: {
            exclude: ['userId', 'createdAt', 'updatedAt'],
          },
          through: {
            attributes: ['read', 'id'],
            as: 'readinglists',
            where,
          },
        },
      ],
    })
    if (!user) {
      throw new CustomError('User not found or not existing', 404)
    }
    res.json(user)
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

router.put(
  '/:id/disable',
  tokenExtractor,
  adminChecker,
  async (req, res, next) => {
    try {
      const user = await User.findByPk(req.params.id)
      if (!user) {
        throw new CustomError('User does not exist', 404)
      }
      user.disabled = true
      await user.save()
      res.status(201).json(user)
    } catch (error) {
      next(error)
    }
  }
)

router.put(
  '/:id/enable',
  tokenExtractor,
  adminChecker,
  async (req, res, next) => {
    try {
      const user = await User.findByPk(req.params.id)
      if (!user) {
        throw new CustomError('User does not exist', 404)
      }
      user.disabled = false
      await user.save()
      res.status(201).json(user)
    } catch (error) {
      next(error)
    }
  }
)

router.post('/', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    res.status(201).json(user)
  } catch (error) {
    next(error)
  }
})

module.exports = router
