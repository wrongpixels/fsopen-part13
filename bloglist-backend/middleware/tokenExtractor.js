const { User } = require('../models')
const CustomError = require('../util/customError')
const jwt = require('jsonwebtoken')
const { SECRET } = require('../util/config')

const tokenExtractor = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.startsWith('Bearer ')
      ? req.headers.authorization.substring(7)
      : ''
    const tokenUser = token ? jwt.verify(token, SECRET) : ''
    if (!tokenUser) {
      throw new CustomError(
        token ? 'Wrong credentials' : 'User is not logged in',
        401
      )
    }
    const activeUser = tokenUser ? await User.findByPk(tokenUser.id) : null
    req.activeUser = activeUser
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = tokenExtractor
