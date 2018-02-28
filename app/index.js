import App from './app'
import Router from './router'
import Controller from './controller'
require('../public/css/index.scss')

const app = new App()
const controller = new Controller({ app: app })
const router = new Router({ controller: controller })

app.Router = router

app.start()
