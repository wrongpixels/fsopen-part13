class CustomError extends Error {
  constructor(
    message = 'There was an error with the request',
    status = 500,
    name = 'CustomError'
  ) {
    super(message)
    this.name = name
    this.status = status
  }
}

module.exports = CustomError
