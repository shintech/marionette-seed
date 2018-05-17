import express from 'express'
import bodyParser from 'body-parser'
import favicon from 'serve-favicon'
import path from 'path'
import morgan from 'morgan'

const app = express()

export default function (options) {
  const { environment, basedir, logger } = options

  if (environment !== 'test') {
    app.use(morgan((environment === 'development') ? 'dev' : 'common'))
  }

  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())

  app.use(favicon(path.join(basedir, 'public', 'images', 'favicon.png')))

  app.use('/vendor', express.static(path.join(basedir, 'node_modules')))
  app.use('/public', express.static(path.join(basedir, 'public')))
  app.use('/frontend', express.static(path.join(basedir, 'dist', 'frontend')))

  app.set('view engine', 'pug')

  app.on('error', err => {
    logger.error(err)
  })

  return app
}
