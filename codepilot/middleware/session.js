import session from 'express-session'
import MongoStore from 'connect-mongo'

// Configured session middleware, mounted once in server.js. Sessions are
// persisted in MongoDB (via connect-mongo) instead of the default in-memory
// store, so logins survive a server restart and work across multiple
// server instances later on.
export const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
  },
})
