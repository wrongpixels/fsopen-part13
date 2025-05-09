const jwt = require('jsonwebtoken')
const { SECRET } = require('../util/config')
const CustomError = require('../util/customError')
const { User } = require('../models')
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
    const userData = { username: validUser.username, id: validUser.id }
    const token = jwt.sign(userData, SECRET)
    res
      .status(201)
      .send({ token, username: userData.username, name: validUser.name })
  } catch (error) {
    next(error)
  }
})

module.exports = router
