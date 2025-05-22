const CustomError = require('../util/customError')

const adminChecker = async (req, res, next) => {
  try {
    if (!req.activeUser.admin) {
      throw new CustomError('Unauthorized access', 401)
    }
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = adminChecker
