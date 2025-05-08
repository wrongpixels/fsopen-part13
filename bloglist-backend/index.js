require('dotenv').config()
const express = require('express')
const { PORT } = require('./util/config')
const { startDB } = require('./util/db')
const { errorHandler, unknownEndpoint } = require('./middleware')

const app = express()
app.use(express.json())
app.use('/api/blogs', require('./controllers/blogs'))
app.use(errorHandler)
app.use(unknownEndpoint)

const start = async () => {
  await startDB()
  app.listen(PORT, () =>
    console.log(`Server running at: http://localhost:${PORT}`)
  )
}
start()
