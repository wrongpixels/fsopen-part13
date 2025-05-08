const unknownEndpoint = (_, response) => {
  response.status(404).json({
    error: {
      status: 404,
      message: 'Unknown endpoint',
    },
  })
}

module.exports = unknownEndpoint
