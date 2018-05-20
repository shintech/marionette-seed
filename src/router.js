import {Router} from 'express'
import {auth, home, users, devices} from './routes'

const router = Router()

export default function (options) {
  router.route('/login')
    .post(auth(options).login)

  router.route('/home')
    .get(home(options).home)

  router.route('/users')
    .get(users(options).read.all)
    .post(users(options).create)

  router.route('/users/:id')
    .get(users(options).read.one)
    .put(users(options).update)
    .delete(users(options).destroy)

  router.route('/devices')
    .get(devices(options).read.all)
    .post(devices(options).create)

  router.route('/devices/:id')
    .get(devices(options).read.one)
    .put(devices(options).update)
    .delete(devices(options).destroy)

  return router
}
