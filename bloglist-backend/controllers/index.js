const blogsRouter = require('./blogs')
const usersRouter = require('./users.js')
const loginRouter = require('./login.js')
const logoutRouter = require('./logout.js')
const authorsRouter = require('./authors.js')
const readingListRouter = require('./readingLists.js')
const sessionsRouter = require('./sessions.js')

module.exports = {
  blogsRouter,
  usersRouter,
  loginRouter,
  logoutRouter,
  authorsRouter,
  readingListRouter,
  sessionsRouter,
}
