import {Router} from 'express'
import {home, models} from './routes'

const router = Router()

export default function (options) {
  router.route('/home')
    .get(home(options).home)

  router.route('/models')
    .get(models(options).read.all)
    .post(models(options).create)

  router.route('/models/:id')
    .get(models(options).read.one)
    .put(models(options).update)
    .delete(models(options).destroy)

  return router
}
