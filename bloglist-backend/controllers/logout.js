const router = require('express').Router()
const { tokenExtractor } = require('../middleware')
const CustomError = require('../util/customError')
const { Session } = require('../models')

router.delete('/', tokenExtractor, async (req, res, next) => {
  try {
    if (!req.activeUser?.id) {
      throw new CustomError('Error handling the request', 500)
    }
    const activeSession = await Session.findOne({
      where: {
        userId: req.activeUser.id,
      },
    })
    if (!activeSession) {
      throw new CustomError('No active session found for user', 400)
    }
    await activeSession.destroy()
    console.log(`User ${req.activeUser.username} logged out successfully`)
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

module.exports = router
