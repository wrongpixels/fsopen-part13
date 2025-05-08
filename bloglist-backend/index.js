require('dotenv').config()
const express = require('express')
const { PORT } = require('./util/config')
const { startDB } = require('./util/db')

const app = express()
app.use(express.json())
app.use('/api/blogs', require('./controllers/blogs'))

const start = async () => {
  await startDB()
  app.listen(PORT, () =>
    console.log(`Server running at: http://localhost:${PORT}`)
  )
}
start()
