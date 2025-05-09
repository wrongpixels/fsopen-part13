// eslint-disable-next-line no-unused-vars
const errorHandler = (error, _, res, _next) => {
  const finalError = {
    message: 'There was an error handling the request',
    status: error.status || 500,
  }
  console.log(error.name)
  switch (error.name) {
    case 'SequelizeValidationError': {
      finalError.status = 400
      finalError.message = error.errors?.map((e) => e.message).join(', ')
      break
    }
    case 'SyntaxError': {
      finalError.status = 400
      finalError.message = error.message
      break
    }
    case 'SequelizeDatabaseError': {
      finalError.status = 400
      finalError.message = error.message || error.parent
      break
    }
    case 'DatabaseError': {
      finalError.status = 404
      finalError.message = error.message || error.parent
      break
    }
  }
  console.log(error)
  res
    .status(finalError.status)
    .json({ error: { status: finalError.status, message: finalError.message } })
}
module.exports = errorHandler
