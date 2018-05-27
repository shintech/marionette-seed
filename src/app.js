import express from 'express'
import csrf from 'csurf'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import favicon from 'serve-favicon'
import path from 'path'
import morgan from 'morgan'
import bcrypt from 'bcryptjs'
import uid from 'uuid/v1'

const app = express()

export default function (options) {
  const { environment, basedir, logger } = options

  const RedisStore = require('connect-redis')(session)
  const csrfProtection = csrf({ cookie: true })

  const store = new RedisStore({
    url: options.redisURL
  })

  if (environment !== 'test') {
    app.use(morgan((environment === 'development') ? 'dev' : 'common'))
  }

  app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    cookie: {
      secure: false
    },
    store: store
  }))

  app.set('view engine', 'pug')

  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())
  app.use(cookieParser())
  app.use(favicon(path.join(basedir, 'public', 'images', 'favicon.png')))

  app.use('/vendor', express.static(path.join(basedir, 'node_modules')))
  app.use('/public', express.static(path.join(basedir, 'public')))

  /// ////////////////////////////////////////////////////////////////////////////////////////

  app.get('/', csrfProtection, (req, res) => {
    res.status(200)
      .render('index', {
        title: 'marionette.seed',
        csrf: req.csrfToken()
      })
  })

  /// ////////////////////////////////////////////////////////////////////////////////////////

  app.get('/session', function (req, res) {
    if (req.session.user) {
      res.status(200)
        .json({
          auth: true,
          user: req.session.user
        })
    } else {
      res.status(401)
        .json({
          auth: false,
          csrf: req.session._csrf
        })
    }
  })

  /// ////////////////////////////////////////////////////////////////////////////////////////

  app.post('/session/login', async function (req, res, next) {
    let user, status, passwordCheck
    let username = req.body.username
    let password = req.body.password

    try {
      user = await options.db.one('select id, username, first_name, last_name, password from users where username = $1', username)
      passwordCheck = await bcrypt.compare(password, user.password)
      status = 200
    } catch (err) {
      user = { error: err.message || err }
      if (err.constructor.name !== 'QueryResultError') return res.sendStatus(500)
    }

    if (user.error || !user.id) return res.status(401).send({ auth: false })

    if (user.id && passwordCheck) {
      let session = {
        id: user.id,
        username: user.username,
        fullName: `${user.first_name} ${user.last_name}`
      }

      req.session.user = session

      req.session.save(err => {
        if (err) return res.sendStatus(500)
      })

      return res.status(status)
        .json({
          auth: passwordCheck,
          user: session
        })
    }

    return res.status(401)
      .json({
        auth: false
      })
  })

  /// ////////////////////////////////////////////////////////////////////////////////////////

  app.delete('/session/logout', function (req, res) {
    req.session.user = null
    req.session._csrf = uid()

    res.status(200)
      .json({
        csrf: req.session._csrf
      })
  })

  /// ////////////////////////////////////////////////////////////////////////////////////////

  app.on('error', err => {
    logger.error(err)
  })

  return app
}
