import App from './app'
import Router from './router'
import Controller from './controller'
require('../public/css/index.scss')

const app = new App()

app.controller = new Controller(app)

app.Router = new Router(app)

app.start()
