import {Router} from 'express'
import {home, users} from './routes'

const router = Router()

export default function (options) {
  router.route('/home')
    .get(home(options).home)

  router.route('/users')
    .get(users(options).read.all)
    .post(users(options).create)

  router.route('/users/:id')
    .get(users(options).read.one)
    .put(users(options).update)
    .delete(users(options).destroy)

  return router
}
