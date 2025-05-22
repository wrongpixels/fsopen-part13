const router = require('express').Router()
const { Session } = require('../models')
const { tokenExtractor, adminChecker } = require('../middleware')
const CustomError = require('../util/customError')

router.get('/', tokenExtractor, adminChecker, async (req, res, next) => {
  try {
    const sessions = await Session.findAll()
    res.json(sessions)
  } catch (error) {
    next(error)
  }
})

router.delete(
  '/:userId',
  tokenExtractor,
  adminChecker,
  async (req, res, next) => {
    try {
      const session = await Session.findOne({
        where: {
          userId: req.params.userId,
        },
      })
      if (session) {
        await session.destroy()
      } else {
        throw new CustomError('User does not have any active session', 404)
      }
      res.status(204).end()
    } catch (error) {
      next(error)
    }
  }
)

module.exports = router
