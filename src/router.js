import {Router} from 'express'
import {auth, home, users, devices} from './routes'

const router = Router()

export default function (options) {
  router.route('/login')
    .post(auth(options).login)

  router.route('/home')
    .get(Auth, home(options).home)

  router.route('/users')
    .get(Auth, users(options).read.all)
    .post(Auth, users(options).create)

  router.route('/users/:id')
    .get(Auth, users(options).read.one)
    .put(Auth, users(options).update)
    .delete(Auth, users(options).destroy)

  router.route('/devices')
    .get(Auth, devices(options).read.all)
    .post(Auth, devices(options).create)

  router.route('/devices/:id')
    .get(Auth, devices(options).read.one)
    .put(Auth, devices(options).update)
    .delete(Auth, devices(options).destroy)

  return router
}

function Auth (req, res, next) {
  if (req.session.user) {
    next()
  } else {
    res.status(401)
      .json({
        message: 'Please log in...'
      })
  }
}
