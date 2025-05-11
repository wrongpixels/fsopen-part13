require('dotenv').config()
const express = require('express')
const { PORT } = require('./util/config')
const { startDB } = require('./util/db')
const {
  blogsRouter,
  authorsRouter,
  loginRouter,
  usersRouter,
} = require('./controllers')

const { errorHandler, unknownEndpoint } = require('./middleware')

const app = express()
app.use(express.json())
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/authors', authorsRouter)
app.use(errorHandler)
app.use(unknownEndpoint)

const start = async () => {
  await startDB()
  app.listen(PORT, () =>
    console.log(`Server running at: http://localhost:${PORT}`)
  )
}
start()
