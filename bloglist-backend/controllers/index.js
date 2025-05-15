const blogsRouter = require('./blogs')
const usersRouter = require('./users.js')
const loginRouter = require('./login.js')
const authorsRouter = require('./authors.js')
const readingListRouter = require('./readingLists.js')

module.exports = {
  blogsRouter,
  usersRouter,
  loginRouter,
  authorsRouter,
  readingListRouter,
}
