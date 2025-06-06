const jwt = require('jsonwebtoken')
const { SECRET } = require('../util/config')
const CustomError = require('../util/customError')
const { User, Session } = require('../models')
const router = require('express').Router()

router.post('/', async (req, res, next) => {
  try {
    const validUser =
      req.body.password === 'supersafe'
        ? await User.findOne({
            where: {
              username: req.body.username,
            },
          })
        : null

    if (!validUser) {
      throw new CustomError('Invalid credentials', 401)
    }
    const existingSession = await Session.findOne({
      where: {
        userId: validUser.id,
      },
    })
    if (validUser.disabled) {
      await existingSession.destroy()
      throw new CustomError('User is disabled. Contact administration.', 401)
    }
    const userData = { username: validUser.username, id: validUser.id }
    const token = jwt.sign(userData, SECRET)
    if (token) {
      if (existingSession) {
        existingSession.token = token
        await existingSession.save()
      } else {
        await Session.create({ userId: validUser.id, token })
      }
    }
    res
      .status(201)
      .send({ token, username: userData.username, name: validUser.name })
  } catch (error) {
    next(error)
  }
})

module.exports = router
